import { useState, type FormEvent } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { getApiErrorMessage } from "@/lib/apiError";
import { type Classification, reasonLabel } from "@/api/paidOrders";
import { PaidOrderFields, ItemReasonField } from "./PaidOrderFields";
import { Button } from "@/components/ui/button";

export default function ClassificationCard({ kind, id, cancelled }: { kind: "po" | "wso"; id: number; cancelled: boolean }) {
  const client = useQueryClient();
  const [draft, setDraft] = useState<Classification | null>(null);
  const url = `/order-classification/${kind}/${id}`;
  const query = useQuery({ queryKey: ["order-classification", kind, id], queryFn: async () => (await api.get<Classification>(url)).data });
  const save = useMutation({ mutationFn: (payload: Classification) => api.put(url, payload), onSuccess: async () => { setDraft(null); await client.invalidateQueries(); } });
  if (query.isLoading) return <p>Loading order classification…</p>;
  if (query.isError || !query.data) return <p role="alert">Could not load classification. <Button variant="outline" onClick={() => query.refetch()}>Retry</Button></p>;
  const data = query.data;
  function submit(e: FormEvent) { e.preventDefault(); if (draft) save.mutate(draft); }
  return <section className="space-y-4 rounded-lg border p-5" aria-label="Order classification">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><h2 className="font-semibold">{data.is_paid_order ? `Paid order · ${data.branch_name}` : "Bulk order"}</h2>
        {data.is_paid_order && <Link className="text-sm text-sky-700 underline" to="/paid-orders">Back to Paid Orders</Link>}
      </div>
      {!draft && <Button variant="outline" disabled={cancelled} onClick={() => { save.reset(); setDraft(structuredClone(data)); }}>Edit classification</Button>}
    </div>
    {draft ? <form onSubmit={submit} className="space-y-4">
      <PaidOrderFields paid={draft.is_paid_order} branch={draft.branch_id} originalBranch={data.branch_id} onChange={(paid, branch) => setDraft({ ...draft, is_paid_order: paid, branch_id: branch, items: draft.items.map(i => ({ ...i, paid_order_reason: paid ? i.paid_order_reason : null })) })} />
      {draft.is_paid_order && draft.items.map((item,index) => <div key={item.id} className="rounded border p-3"><p className="mb-2">Item {index + 1}: {item.description || "No description"}</p><ItemReasonField value={item.paid_order_reason} onChange={reason => setDraft({ ...draft, items: draft.items.map(i => i.id === item.id ? { ...i, paid_order_reason: reason } : i) })} /></div>)}
      {save.isError && <p role="alert" className="text-red-700">{getApiErrorMessage(save.error)}</p>}
      <div className="flex gap-2"><Button disabled={save.isPending}>Save classification</Button><Button type="button" variant="outline" disabled={save.isPending} onClick={() => setDraft(null)}>Cancel</Button></div>
    </form> : data.is_paid_order && <ul className="space-y-1 text-sm">{data.items.map((item,index) => <li key={item.id}>Item {index + 1} · {item.description || "No description"} — {item.paid_order_reason ? reasonLabel(item.paid_order_reason) : "Missing reason"}</li>)}</ul>}
  </section>;
}

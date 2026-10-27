import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBranches, type Branch } from "@/api/paidOrders";
import { api } from "@/lib/api";
import { getApiErrorMessage } from "@/lib/apiError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const empty = { code: "", name: "", active: true };
export default function BranchesPage() {
  const query = useBranches(); const client = useQueryClient();
  const [draft, setDraft] = useState<Omit<Branch,"id"> & { id?: number }>(empty);
  const save = useMutation({ mutationFn: (value: typeof draft) => value.id ? api.put(`/branches/${value.id}`,value) : api.post("/branches",value), onSuccess: () => { setDraft(empty); client.invalidateQueries({queryKey:["branches"]}); } });
  function submit(e: FormEvent) { e.preventDefault(); save.mutate(draft); }
  return <div className="space-y-6">
    <Link className="text-sky-700 underline" to="/settings">Back to Settings</Link>
    <div><h1 className="text-3xl font-bold">Branches</h1><p className="mt-2 text-slate-600">Inactive branches remain on historical orders but cannot receive new assignments.</p></div>
    <form onSubmit={submit} className="space-y-4 rounded-lg border p-5">
      <h2 className="font-semibold">{draft.id ? "Edit branch" : "New branch"}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <label>Branch code<Input required maxLength={30} disabled={!!draft.id} value={draft.code} onChange={e => setDraft({...draft,code:e.target.value})} /><span className="text-xs text-slate-600">Permanent reporting identifier</span></label>
        <label>Branch name<Input required maxLength={150} value={draft.name} onChange={e => setDraft({...draft,name:e.target.value})} /></label>
      </div>
      <label className="flex items-center gap-2"><input type="checkbox" checked={draft.active} onChange={e => setDraft({...draft,active:e.target.checked})} />Active</label>
      {save.isError && <p role="alert" className="text-red-700">{getApiErrorMessage(save.error)}</p>}
      <div className="flex gap-2"><Button disabled={save.isPending}>Save branch</Button>{draft.id && <Button type="button" variant="outline" onClick={() => {setDraft(empty);save.reset();}}>Cancel</Button>}</div>
    </form>
    {query.isLoading && <p>Loading branches…</p>}
    {query.isError && <p role="alert">Could not load branches. <Button variant="outline" onClick={() => query.refetch()}>Retry</Button></p>}
    {query.data?.length === 0 && <p>No branches configured. Add the first branch above.</p>}
    <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b"><th className="p-3">Code</th><th>Name</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{query.data?.map(b => <tr className="border-b" key={b.id}><td className="p-3">{b.code}</td><td>{b.name}</td><td>{b.active ? "Active" : "Inactive"}</td><td><Button variant="outline" onClick={() => {setDraft(b);save.reset();}}>Edit {b.name}</Button></td></tr>)}</tbody></table></div>
  </div>;
}

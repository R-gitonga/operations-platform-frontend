import { useId } from "react";
import { useBranches, type Reason } from "@/api/paidOrders";
import { Button } from "@/components/ui/button";

export function PaidOrderFields({ paid, branch, onChange, originalBranch }: {
  paid: boolean; branch: number | null; onChange: (paid: boolean, branch: number | null) => void;
  originalBranch?: number | null;
}) {
  const id = useId();
  const { data = [], isLoading, isError, refetch } = useBranches();
  const choices = data.filter(b => b.active || b.id === originalBranch);
  return <fieldset className="space-y-3 rounded-lg border bg-slate-50 p-4">
    <label className="flex items-center gap-2 font-medium" htmlFor={id}>
      <input id={id} type="checkbox" checked={paid} onChange={e => onChange(e.target.checked, e.target.checked ? branch : null)} /> Paid order
    </label>
    <p className="text-sm text-slate-600">Track customer MTM and stock-out items for branch follow-up.</p>
    {paid && <>
      <label className="block space-y-1"><span>Branch <span aria-hidden="true">*</span></span>
        <select aria-label="Branch" required value={branch ?? ""} className="block w-full rounded-md border bg-white p-2" onChange={e => onChange(true, e.target.value ? Number(e.target.value) : null)}>
          <option value="">{isLoading ? "Loading branches…" : "Select branch"}</option>
          {choices.map(b => <option key={b.id} value={b.id}>{b.name}{!b.active ? " (inactive — existing assignment)" : ""}</option>)}
        </select>
      </label>
      {isError && <p role="alert">Branches could not be loaded. <Button type="button" variant="outline" onClick={() => refetch()}>Retry</Button></p>}
      {!isLoading && !isError && !choices.length && <p role="alert">An administrator must configure an active branch in Settings → Branches before a paid order can be saved.</p>}
    </>}
  </fieldset>;
}

export function ItemReasonField({ value, onChange }: { value?: Reason | null; onChange: (reason: Reason | null) => void }) {
  return <label className="block space-y-1"><span className="text-sm font-medium">Item reason *</span>
    <select aria-label="Item reason" required className="block w-full rounded-md border bg-white p-2" value={value ?? ""} onChange={e => onChange((e.target.value || null) as Reason | null)}>
      <option value="">Select reason</option><option value="mtm">Make to measure (MTM)</option><option value="stock_out">Stock-out</option>
    </select>
  </label>;
}

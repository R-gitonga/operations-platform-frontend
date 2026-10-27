import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useBranches, reasonLabel, type PaidOrderPage } from "@/api/paidOrders";
import { useCategories } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import PaidOrderReceivingDialog from "@/components/paid-orders/PaidOrderReceivingDialog";
import { getApiErrorMessage } from "@/lib/apiError";

export default function PaidOrdersPage() {
  const [params,setParams] = useSearchParams();
  const branches = useBranches(); const categories = useCategories();
  const query = useQuery({ queryKey:["paid-orders",params.toString()], queryFn:async () => (await api.get<PaidOrderPage>(`/paid-orders?${params}`)).data, refetchInterval:60_000 });
  const value = (key:string, fallback="") => params.get(key) ?? fallback;
  function change(key:string, next:string) { const p=new URLSearchParams(params); if(next) p.set(key,next); else p.delete(key); if(key!=="page") p.delete("page"); setParams(p,{replace:true}); }
  const selectClass="mt-1 block w-full rounded-md border bg-white p-2";
  return <div className="space-y-6">
    <div className="flex flex-wrap items-start justify-between gap-3"><div><h1 className="text-3xl font-bold">Paid Orders</h1><p className="mt-2 text-slate-600">Branch follow-up for made-to-measure and stock-out items. Oldest orders first.</p></div><div className="flex gap-3"><Button asChild><Link to="/orders/new">New WSO</Link></Button><Button asChild variant="outline"><Link to="/purchase-orders/new">New PO</Link></Button></div></div>
    <section aria-label="Paid order filters" className="grid gap-4 rounded-lg border bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-4">
      <label>Branch<select className={selectClass} value={value("branch_id")} onChange={e=>change("branch_id",e.target.value)}><option value="">All branches</option>{branches.data?.map(b=><option key={b.id} value={b.id}>{b.name}{b.active?"":" (inactive)"}</option>)}</select></label>
      <label>Item reason<select className={selectClass} value={value("reason")} onChange={e=>change("reason",e.target.value)}><option value="">All reasons</option><option value="mtm">Make to measure (MTM)</option><option value="stock_out">Stock-out</option></select></label>
      <label>Product category<select className={selectClass} value={value("category_id")} onChange={e=>change("category_id",e.target.value)}><option value="">All categories</option>{categories.data?.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
      <label>Order type<select className={selectClass} value={value("order_type")} onChange={e=>change("order_type",e.target.value)}><option value="">WSO and PO</option><option value="wso">WSO</option><option value="po">PO</option></select></label>
      <label>Status<select className={selectClass} value={value("status","open")} onChange={e=>change("status",e.target.value)}>{["open","all","active","partial","completed","cancelled"].map(s=><option key={s} value={s}>{s[0].toUpperCase()+s.slice(1)}</option>)}</select></label>
      <label>Reference<input type="search" className={selectClass} value={value("search")} onChange={e=>change("search",e.target.value)} placeholder="WSO, ERP or accounts reference" /></label>
      <label>Created from<input type="date" className={selectClass} value={value("date_from")} onChange={e=>change("date_from",e.target.value)} /></label>
      <label>Created through<input type="date" className={selectClass} value={value("date_to")} onChange={e=>change("date_to",e.target.value)} /></label>
      <div className="flex gap-2"><Button variant="outline" onClick={()=>setParams({})}>Reset filters</Button><Button variant="outline" onClick={()=>query.refetch()}>Refresh</Button></div>
    </section>
    {(branches.isError || categories.isError) && <p role="alert">Some filter options could not be loaded. <Button variant="outline" onClick={()=>{branches.refetch();categories.refetch();}}>Retry filters</Button></p>}
    <p className="text-sm text-slate-600">Quantities cover matching items only. WSO fulfilment is received quantity; PO fulfilment is accepted quantity after defects. Dates use Nairobi time.</p>
    {query.isLoading && <p>Loading paid orders…</p>}
    {query.isError && <p role="alert" className="text-red-700">{getApiErrorMessage(query.error)} <Button variant="outline" onClick={()=>query.refetch()}>Retry</Button></p>}
    {query.data && <>
      <p aria-live="polite">{query.data.total} matching orders</p>
      {query.data.items.length===0 ? <p className="rounded border p-8 text-center">No paid orders match these filters.</p> : <div className="grid gap-4 lg:grid-cols-2">{query.data.items.map(o=><article className="relative rounded-xl border bg-white p-5 shadow-sm transition hover:border-sky-400 hover:shadow-md focus-within:ring-2 focus-within:ring-sky-600" key={`${o.order_type}-${o.order_id}`}>
        <Link className="absolute inset-0 rounded-xl focus:outline-none" aria-label={`Open ${o.order_type.toUpperCase()} ${o.reference}, ${o.branch_name}`} to={o.order_type==="wso"?`/orders/${o.order_id}`:`/purchase-orders/${o.order_id}`} />
        <div className="flex justify-between gap-3"><div><h2 className="text-lg font-semibold text-sky-800">{o.order_type.toUpperCase()} · {o.reference}</h2><p className="text-sm text-slate-600">{o.secondary_reference}</p><p className="mt-1 font-medium">{o.branch_name}</p></div><span className="h-fit rounded-full bg-slate-100 px-3 py-1 text-sm capitalize">{o.status}</span></div>
        <ul className="my-4 space-y-2">{o.matched_items.map(i=><li key={i.id}>{i.description || i.category || `Item ${i.id}`}<span className="block text-xs text-slate-600">{reasonLabel(i.reason)}{i.category?` · ${i.category}`:""}</span></li>)}</ul>
        <dl className="grid grid-cols-3 gap-3 rounded-lg bg-slate-50 p-3 text-sm"><div><dt>Ordered</dt><dd className="text-xl font-semibold">{o.ordered}</dd></div><div><dt>{o.order_type==="wso"?"Received":"Accepted"}</dt><dd className="text-xl font-semibold">{o.fulfilled}</dd></div><div><dt>Outstanding</dt><dd className="text-xl font-semibold">{o.outstanding}</dd></div></dl>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-slate-600">{new Date(o.created_at).toLocaleDateString("en-GB",{timeZone:"Africa/Nairobi"})} · {Math.max(0,Math.floor((query.dataUpdatedAt-Date.parse(o.created_at))/86400000))} days old</p><PaidOrderReceivingDialog order={o} /></div>
      </article>)}</div>}
      <div className="flex items-center gap-4"><Button variant="outline" disabled={query.data.page<=1} onClick={()=>change("page",String(query.data!.page-1))}>Previous</Button><span>Page {query.data.page} of {Math.max(1,Math.ceil(query.data.total/query.data.page_size))}</span><Button variant="outline" disabled={query.data.page*query.data.page_size>=query.data.total} onClick={()=>change("page",String(query.data!.page+1))}>Next</Button></div>
    </>}
  </div>;
}

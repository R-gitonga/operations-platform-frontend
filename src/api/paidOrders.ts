import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export type Reason = "mtm" | "stock_out";
export const reasonLabel = (reason: string) => reason === "mtm" ? "Make to measure (MTM)" : "Stock-out";
export interface Branch { id: number; code: string; name: string; active: boolean }
export interface Classification {
  is_paid_order: boolean; branch_id: number | null; branch_name?: string;
  items: { id: number; description: string | null; paid_order_reason: Reason | null }[];
}
export interface PaidOrderRow {
  order_type: "wso" | "po"; order_id: number; reference: string; secondary_reference: string;
  branch_name: string; created_at: string; status: string; reasons: Reason[]; categories: string[] | null;
  ordered: number; fulfilled: number; outstanding: number;
  matched_items: { id: number; description: string | null; reason: Reason; category: string | null }[];
}
export interface PaidOrderPage { items: PaidOrderRow[]; total: number; page: number; page_size: number }
export function useBranches() {
  return useQuery({ queryKey: ["branches"], queryFn: async () => (await api.get<Branch[]>("/branches")).data });
}

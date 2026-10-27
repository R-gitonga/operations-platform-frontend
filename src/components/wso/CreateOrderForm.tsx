import { PaidOrderFields, ItemReasonField } from "@/components/paid-orders/PaidOrderFields";
import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "../ui/button";

import { useCategories } from "@/hooks/useCategories";
import { useCreateWso } from "@/hooks/useCreateWso";
import { getApiErrorMessage } from "@/lib/apiError";

import WsoHeaderForm from "./WsoHeaderForm";
import ProductionItemForm from "./ProductionItemForm";
import LineItemsForm from "../orders/LineItemsForm";

import type { CreateCompleteWsoRequest } from "@/types/wso";
import type { WsoHeaderFormData } from "@/types/wsoHeaderForm";
import type { ProductionItemFormData } from "@/types/productionItemForm";

export default function WsoForm() {
  const navigate = useNavigate();
  const [paid, setPaid] = useState(false);
  const [branch, setBranch] = useState<number | null>(null);

  const { data: categories } = useCategories();

  const createMutation = useCreateWso();

  const [header, setHeader] = useState<WsoHeaderFormData>({
    date_signed: "",
    wso_number: "",
    req_number: "",
  });

  const [items, setItems] = useState<ProductionItemFormData[]>([
    {
      category_id: undefined,
      description: "",
      design_code: "",
      fabric_code: "",
      branding_required: false,
      branding: [],
      // branding_completed: false,
      line_items: [
        {
          size: "",
          qty_raised: 0,
        },
      ],
    },
  ]);

  function updateItem(index: number, updatedItem: ProductionItemFormData) {
    const copy = [...items];
    copy[index] = updatedItem;
    setItems(copy);
  }

  function addProductionItem() {
    setItems([
      ...items,
      {
        category_id: undefined,
        description: "",
        design_code: "",
        fabric_code: "",
        branding_required: false,
        branding: [],
        // branding_completed: false,
        line_items: [
          {
            size: "",
            qty_raised: 0,
          },
        ],
      },
    ]);
  }

  function removeProductionItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: CreateCompleteWsoRequest = {
      is_paid_order: paid, branch_id: paid ? branch : null,
      date_signed: header.date_signed || undefined,
      wso_number: header.wso_number,
      req_number: header.req_number || undefined,

      items: items.map((item) => ({
        paid_order_reason: paid ? item.paid_order_reason : null,
        category_id: item.category_id!,
        description: item.description,
        design_code: item.design_code,
        fabric_code: item.fabric_code,
        branding_required: item.branding_required,
        // branding_completed: item.branding_completed,
        branding: item.branding,
        line_items: item.line_items,
      })),
    };

    createMutation.mutate(payload, {
      onSuccess: (order) => {
        toast.success("Workshop Order created successfully.");
        navigate(paid ? `/orders/${order.id}` : "/orders");
      },

      onError: (error) => {
        toast.error(getApiErrorMessage(error));
      },
    });
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <WsoHeaderForm header={header} setHeader={setHeader} />
      <PaidOrderFields paid={paid} branch={branch} onChange={(value, id) => { setPaid(value); setBranch(id); if (!value) setItems(items.map(i => ({...i, paid_order_reason: null}))); }} />

      {items.map((item, index) => (
        <div key={index} className="space-y-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Production Item {index + 1}
            </h2>

            {items.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeProductionItem(index)}
              >
                Remove
              </Button>
            )}
          </div>

          {paid && <ItemReasonField value={item.paid_order_reason} onChange={reason => updateItem(index, {...item, paid_order_reason: reason})} />}
          <ProductionItemForm
            item={item}
            onChange={(updated) => updateItem(index, updated)}
            categories={categories ?? []}
          />

          <LineItemsForm
            item={item}
            onChange={(updated) => updateItem(index, updated)}
          />
        </div>
      ))}

      <Button type="button" variant="outline" onClick={addProductionItem}>
        + Add Production Item
      </Button>

      <div className="flex justify-end">
        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Creating..." : "Create WSO"}
        </Button>
      </div>
    </form>
  );
}

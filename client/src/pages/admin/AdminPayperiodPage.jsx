import { useState } from "react";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import {
  useGetPayperiodsQuery,
  useCreatePayperiodMutation,
  useUpdatePayperiodMutation,
  useDeletePayperiodMutation,
  useGetFeaturesQuery,
} from "@/redux/services/adminApi";

export default function AdminPayperiodPage() {
  const { data: features = [] } = useGetFeaturesQuery();
  const { data = [], isLoading } = useGetPayperiodsQuery();

  const [createPayperiod, { isLoading: isCreating }] =
    useCreatePayperiodMutation();
  const [updatePayperiod, { isLoading: isUpdating }] =
    useUpdatePayperiodMutation();
  const [deletePayperiod] = useDeletePayperiodMutation();

  const [isEditing, setIsEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    status: "Active",
    validityDays: 30,
    PayPeriodPrice: [
      {
        featureId: "",
        price: "",
        status: "Active",
        payPeriodContents: [{ name: "" }],
      },
    ],
  });

  const handlePriceChange = (index, field, value) => {
    const newPrices = [...form.PayPeriodPrice];
    newPrices[index][field] = value;
    setForm({ ...form, PayPeriodPrice: newPrices });
  };

  const handleContentChange = (pIndex, cIndex, value) => {
    const newPrices = [...form.PayPeriodPrice];
    newPrices[pIndex].payPeriodContents[cIndex].name = value;
    setForm({ ...form, PayPeriodPrice: newPrices });
  };

  const addPriceRow = () => {
    setForm({
      ...form,
      PayPeriodPrice: [
        ...form.PayPeriodPrice,
        {
          featureId: "",
          price: "",
          status: "Active",
          payPeriodContents: [{ name: "" }],
        },
      ],
    });
  };

  const removePriceRow = (index) => {
    const newPrices = [...form.PayPeriodPrice];
    newPrices.splice(index, 1);
    setForm({ ...form, PayPeriodPrice: newPrices });
  };

  const addContentRow = (pIndex) => {
    const newPrices = [...form.PayPeriodPrice];
    newPrices[pIndex].payPeriodContents.push({ name: "" });
    setForm({ ...form, PayPeriodPrice: newPrices });
  };

  const removeContentRow = (pIndex, cIndex) => {
    const newPrices = [...form.PayPeriodPrice];
    newPrices[pIndex].payPeriodContents.splice(cIndex, 1);
    setForm({ ...form, PayPeriodPrice: newPrices });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (form.PayPeriodPrice.length === 0) {
      alert("Please add at least one feature pricing.");
      return;
    }

    const cleanedPrices = form.PayPeriodPrice.map((p) => ({
      ...p,
      payPeriodContents: p.payPeriodContents.filter(
        (c) => c.name.trim() !== "",
      ),
    }));

    const submitData = { ...form, PayPeriodPrice: cleanedPrices };

    if (isEditing) {
      await updatePayperiod({ id: isEditing, ...submitData });
    } else {
      await createPayperiod(submitData);
    }
    setForm({
      name: "",
      status: "Active",
      validityDays: 30,
      PayPeriodPrice: [
        {
          featureId: "",
          price: "",
          status: "Active",
          payPeriodContents: [{ name: "" }],
        },
      ],
    });
    setIsEditing(null);
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      status: item.status ? "Active" : "Inactive",
      validityDays: item.validityDays || 30,
      PayPeriodPrice:
        item.PayPeriodPrice?.length > 0
          ? item.PayPeriodPrice.map((p) => ({
              featureId: p.featureId,
              price: p.price,
              status: p.status ? "Active" : "Inactive",
              payPeriodContents:
                p.payPeriodContents?.length > 0
                  ? p.payPeriodContents.map((c) => ({ name: c.name }))
                  : [{ name: "" }],
            }))
          : [
              {
                featureId: "",
                price: "",
                status: "Active",
                payPeriodContents: [{ name: "" }],
              },
            ],
    });
    setIsEditing(item.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this payperiod?")) {
      await deletePayperiod(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-[#e56419]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {isEditing ? "Edit Payperiod" : "Add New Payperiod"}
        </h3>
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Payperiod Name
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. MONTHLY"
                className="w-full h-10 px-4 rounded-xl border border-gray-200 focus:border-[#e56419] outline-none text-sm font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Payperiod Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full h-10 px-4 rounded-xl border border-gray-200 focus:border-[#e56419] outline-none text-sm font-medium bg-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Plan Validity (Days)
              </label>
              <input
                type="number"
                required
                value={form.validityDays}
                onChange={(e) =>
                  setForm({
                    ...form,
                    validityDays: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="e.g. 30 for Monthly, 365 for Yearly"
                className="w-full h-10 px-4 rounded-xl border border-gray-200 focus:border-[#e56419] outline-none text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Features, Pricing & Contents
              </label>
              <button
                type="button"
                onClick={addPriceRow}
                className="text-sm font-bold text-white bg-gray-900 rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-gray-800"
              >
                <Plus size={16} /> Add Feature Pricing
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {form.PayPeriodPrice.map((fp, pIndex) => (
                <div
                  key={pIndex}
                  className="border border-gray-200 rounded-xl bg-gray-50/50 p-4 relative"
                >
                  <button
                    type="button"
                    onClick={() => removePriceRow(pIndex)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pr-10">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Feature
                      </label>
                      <select
                        value={fp.featureId}
                        onChange={(e) =>
                          handlePriceChange(pIndex, "featureId", e.target.value)
                        }
                        required
                        className="w-full h-10 px-3 rounded-lg border border-gray-200 outline-none text-sm bg-white focus:border-[#e56419]"
                      >
                        <option value="">Select Feature...</option>
                        {features.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Price
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="0.00"
                        value={fp.price}
                        onChange={(e) =>
                          handlePriceChange(pIndex, "price", e.target.value)
                        }
                        onBlur={(e) => {
                          const val = parseFloat(e.target.value);
                          if (!isNaN(val))
                            handlePriceChange(pIndex, "price", val.toFixed(2));
                        }}
                        className="w-full h-10 px-3 rounded-lg border border-gray-200 outline-none text-sm focus:border-[#e56419]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Status
                      </label>
                      <select
                        value={fp.status}
                        onChange={(e) =>
                          handlePriceChange(pIndex, "status", e.target.value)
                        }
                        className="w-full h-10 px-3 rounded-lg border border-gray-200 outline-none text-sm bg-white focus:border-[#e56419]"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <div className="flex items-center mb-3">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Feature Contents
                        <span className="text-gray-400 font-normal ml-1">
                          (e.g. Include 10 Payslips)
                        </span>
                      </label>
                    </div>
                    <div className="flex flex-col gap-2">
                      {fp.payPeriodContents.map((content, cIndex) => (
                        <div
                          key={cIndex}
                          className="flex items-center gap-2 max-w-lg"
                        >
                          <input
                            type="text"
                            required
                            placeholder="e.g. Include 10 Payslips"
                            value={content.name}
                            onChange={(e) =>
                              handleContentChange(
                                pIndex,
                                cIndex,
                                e.target.value,
                              )
                            }
                            className="flex-1 h-9 px-3 rounded-lg border border-gray-200 outline-none text-sm focus:border-[#e56419]"
                          />
                          <button
                            type="button"
                            onClick={() => removeContentRow(pIndex, cIndex)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <div className="mt-1">
                        <button
                          type="button"
                          onClick={() => addContentRow(pIndex)}
                          className="text-xs font-bold text-[#e56419] flex items-center gap-1 hover:text-[#d45610]"
                        >
                          <Plus size={14} /> Add Another Content
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {form.PayPeriodPrice.length === 0 && (
                <div className="text-center p-6 border border-dashed border-gray-300 rounded-xl text-gray-500 text-sm">
                  No feature pricing configurations added yet.
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="h-10 px-6 bg-[#e56419] text-white font-bold rounded-xl flex items-center gap-2 hover:bg-[#d45610] disabled:opacity-70 shadow-sm"
            >
              {isCreating || isUpdating ? (
                <Loader2 size={16} className="animate-spin" />
              ) : isEditing ? (
                "Update Payperiod"
              ) : (
                <>
                  <Plus size={16} /> Save Payperiod
                </>
              )}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(null);
                  setForm({
                    name: "",
                    status: "Active",
                    validityDays: 30,
                    PayPeriodPrice: [
                      {
                        featureId: "",
                        price: "",
                        status: "Active",
                        payPeriodContents: [{ name: "" }],
                      },
                    ],
                  });
                }}
                className="h-10 px-6 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-1/5">
                Payperiod Name
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-24">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Features & Contents Configured
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 group">
                <td className="px-6 py-4 align-top">
                  <div className="text-sm font-bold text-gray-900">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Valid for{" "}
                    <span className="font-semibold text-gray-700">
                      {item.validityDays}
                    </span>{" "}
                    days
                  </div>
                </td>
                <td className="px-6 py-4 align-top">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${item.status ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                  >
                    {item.status ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4 align-top">
                  {item.PayPeriodPrice && item.PayPeriodPrice.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {item.PayPeriodPrice.map((p) => (
                        <div
                          key={p.id}
                          className="flex flex-col gap-1.5 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center gap-3 text-sm">
                            <span
                              className="font-bold text-gray-800"
                              title={p.Features?.name || "Unknown"}
                            >
                              {p.Features?.name || "Unknown"}
                            </span>
                            <span className="font-semibold text-[#e56419] bg-orange-50 px-2 py-0.5 rounded">
                              ₹{p.price}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${p.status ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                            >
                              {p.status ? "Active" : "Inactive"}
                            </span>
                          </div>
                          {p.payPeriodContents &&
                            p.payPeriodContents.length > 0 && (
                              <ul className="list-disc list-inside text-xs text-gray-600 ml-1 space-y-0.5">
                                {p.payPeriodContents.map((c) => (
                                  <li key={c.id} className="text-gray-500">
                                    {c.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs italic">
                      No features configured
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 align-top flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-gray-400 hover:text-[#e56419] hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  No payperiods found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

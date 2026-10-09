import { useState } from "react";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import {
  useGetFeaturesQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} from "@/redux/services/adminApi";

export default function AdminFeaturesPage() {
  const { data = [], isLoading } = useGetFeaturesQuery();
  const [createFeature, { isLoading: isCreating }] = useCreateFeatureMutation();
  const [updateFeature, { isLoading: isUpdating }] = useUpdateFeatureMutation();
  const [deleteFeature] = useDeleteFeatureMutation();

  const [isEditing, setIsEditing] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", status: "Active" });

  const handleSave = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateFeature({ id: isEditing, ...form });
    } else {
      await createFeature(form);
    }
    setForm({ name: "", description: "", status: "Active" });
    setIsEditing(null);
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, description: item.description || "", status: item.status ? "Active" : "Inactive" });
    setIsEditing(item.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this feature?")) {
      await deleteFeature(id);
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
          {isEditing ? "Edit Feature" : "Add New Feature"}
        </h3>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-1.5 w-full">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Feature Name
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. MULTI-USER ACCESS"
                className="w-full h-10 px-4 rounded-xl border border-gray-200 focus:border-[#e56419] outline-none text-sm font-medium"
              />
            </div>
            <div className="w-full md:w-48 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Status
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
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              Description (Optional)
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="e.g. Allows multiple users to manage payrolls simultaneously..."
              className="w-full h-20 p-4 rounded-xl border border-gray-200 focus:border-[#e56419] outline-none text-sm font-medium resize-none"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="h-10 px-6 bg-[#e56419] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#d45610] disabled:opacity-70 w-full md:w-auto"
            >
              {isCreating || isUpdating ? (
                <Loader2 size={16} className="animate-spin" />
              ) : isEditing ? (
                "Update"
              ) : (
                <>
                  <Plus size={16} /> Add
                </>
              )}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(null);
                  setForm({ name: "", description: "", status: "Active" });
                }}
                className="h-10 px-6 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 w-full md:w-auto"
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
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-1/4">
                Name
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 align-top">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 align-top">
                  {item.description || <span className="text-gray-400 italic">No description</span>}
                </td>
                <td className="px-6 py-4 align-top">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${item.status ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                  >
                    {item.status ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 flex items-center justify-end gap-2">
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
                  colSpan="3"
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  No features found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

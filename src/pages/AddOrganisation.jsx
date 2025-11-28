// AddOrganisation.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Phone,
  Mail,
  Globe,
  User,
  MapPin,
  FileText,
  X,
  Plus,
} from "lucide-react";
import { message } from "antd";
import dayjs from "dayjs";

/**
 * AddOrganisation.jsx
 * - Matches the OrganizationList styling
 * - Sectioned form for Organisation / Owner / Business / Branch / Depo(Godown)
 * - Branch and Depo sections are repeatable (add/remove)
 *
 * NOTE: replace the final handleSubmit payload send with your API or context call.
 */

export default function AddOrganisation() {
  const navigate = useNavigate();

  const initialBranch = {
    name: "",
    shortName: "",
    address: "",
    branchHead: "",
    mobile: "",
    email: "",
    state: "",
    location: "",
    type: "Main",
  };

  const initialDepo = {
    name: "",
    shortName: "",
    seriesName: "",
    address: "",
    depoHead: "",
    mobile: "",
    email: "",
    state: "",
    location: "",
    type: "Main",
  };
// list of available modules
const modulesList = [
  { id: "DMS", label: "DMS" },
  { id: "AMS", label: "AMS" },
  { id: "WMS", label: "WMS" },
  { id: "HRMS", label: "HRMS" },
];
  const [form, setForm] = useState({
    // Organisation Details
    registeredName: "",
    phone: "",
    address: "",
    email: "",
    organisationType: "",

    // Owner Details
    ownerName: "",
    ownerAddress: "",
    ownerPhone: "",
    ownerEmail: "",

    // Business Details
    tinNo: "",
    tinDate: "",
    panNo: "",
    gstin: "",
    etNo: "",
    etDate: "",
    cstNo: "",
    cstDate: "",
    tradeNo: "",
    website: "",

    // Repeatable lists
    branches: [initialBranch],
    depos: [initialDepo],

    // Misc
    remarks: "",
    modules: [],
  });

  // Helpers to update nested values
  const setField = (key, value) =>
    setForm((p) => ({ ...p, [key]: value }));

  const updateBranch = (idx, key, value) =>
    setForm((p) => {
      const branches = [...p.branches];
      branches[idx] = { ...branches[idx], [key]: value };
      return { ...p, branches };
    });

  const addBranch = () =>
    setForm((p) => ({ ...p, branches: [...p.branches, initialBranch] }));

  const removeBranch = (idx) =>
    setForm((p) => {
      const branches = p.branches.filter((_, i) => i !== idx);
      return { ...p, branches: branches.length ? branches : [initialBranch] };
    });

  const updateDepo = (idx, key, value) =>
    setForm((p) => {
      const depos = [...p.depos];
      depos[idx] = { ...depos[idx], [key]: value };
      return { ...p, depos };
    });

  const addDepo = () =>
    setForm((p) => ({ ...p, depos: [...p.depos, initialDepo] }));

  const removeDepo = (idx) =>
    setForm((p) => {
      const depos = p.depos.filter((_, i) => i !== idx);
      return { ...p, depos: depos.length ? depos : [initialDepo] };
    });

  const validate = () => {
    // Basic required validation for main fields
    if (!form.registeredName?.trim()) {
      message.error("Please provide Registered Name");
      return false;
    }
    if (!form.phone?.trim()) {
      message.error("Please provide Phone Number");
      return false;
    }
    if (!form.email?.trim()) {
      message.error("Please provide Email Address");
      return false;
    }
    // you can add more validations here
    return true;
  };
const toggleModule = (moduleId) => {
  setForm((p) => {
    const has = p.modules.includes(moduleId);
    return {
      ...p,
      modules: has ? p.modules.filter((m) => m !== moduleId) : [...p.modules, moduleId],
    };
  });
};
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Build payload (convert date objects to strings if needed)
    const payload = {
      ...form,
      tinDate: form.tinDate ? dayjs(form.tinDate).format("YYYY-MM-DD") : "",
      etDate: form.etDate ? dayjs(form.etDate).format("YYYY-MM-DD") : "",
      cstDate: form.cstDate ? dayjs(form.cstDate).format("YYYY-MM-DD") : "",
      createdAt: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    };

    // TODO: send payload to API or save in context
    console.log("NEW ORGANISATION PAYLOAD:", payload);

    message.success("Organisation created successfully");
    // navigate back to list (change path if you mounted the list elsewhere)
    navigate(-1); // go back to previous (OrganizationList)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Add Organisation
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Fill in organisation, owner, business and branch details
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition"
                title="Back"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Organisation Details */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-800">Organisation Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registered Name *</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      className="w-full pl-11 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                      value={form.registeredName}
                      onChange={(e) => setField("registeredName", e.target.value)}
                      placeholder="Registered / Legal Name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      className="w-full pl-11 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                    <textarea
                      className="w-full pl-11 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none min-h-[64px]"
                      value={form.address}
                      onChange={(e) => setField("address", e.target.value)}
                      placeholder="Registered office address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="email"
                      className="w-full pl-11 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="company@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organisation Type</label>
                  <select
                    className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    value={form.organisationType}
                    onChange={(e) => setField("organisationType", e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option>Real Estate</option>
                    <option>Distribution</option>
                    <option>Transport</option>
                    <option>Investment</option>
                    <option>Trading</option>
                    <option>Property</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Owner Details */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-800">Owner Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      className="w-full pl-11 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                      value={form.ownerName}
                      onChange={(e) => setField("ownerName", e.target.value)}
                      placeholder="Owner / Proprietor Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      className="w-full pl-11 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                      value={form.ownerPhone}
                      onChange={(e) => setField("ownerPhone", e.target.value)}
                      placeholder="+91 ..."
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">Address</label>
                  <textarea
                    className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none min-h-[64px]"
                    value={form.ownerAddress}
                    onChange={(e) => setField("ownerAddress", e.target.value)}
                    placeholder="Owner address"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="email"
                      className="w-full pl-11 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                      value={form.ownerEmail}
                      onChange={(e) => setField("ownerEmail", e.target.value)}
                      placeholder="owner@example.com"
                    />
                  </div>
                  <label className="block text-sm text-gray-700 mb-1">Email Password</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="email"
                      className="w-full pl-11 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                      value={form.ownerEmail}
                      onChange={(e) => setField("ownerEmail", e.target.value)}
                      placeholder="********"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Business Details */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-800">Business Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Tin No</label>
                  <input
                    className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    value={form.tinNo}
                    onChange={(e) => setField("tinNo", e.target.value)}
                    placeholder="Tin No"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Tin Date</label>
                  <input
                    type="date"
                    className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    value={form.tinDate}
                    onChange={(e) => setField("tinDate", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">PAN No</label>
                  <input
                    className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    value={form.panNo}
                    onChange={(e) => setField("panNo", e.target.value)}
                    placeholder="PAN"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">GSTIN</label>
                  <input
                    className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    value={form.gstin}
                    onChange={(e) => setField("gstin", e.target.value)}
                    placeholder="GSTIN"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">ET No</label>
                  <input
                    className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    value={form.etNo}
                    onChange={(e) => setField("etNo", e.target.value)}
                    placeholder="ET No"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">ET Date</label>
                  <input
                    type="date"
                    className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    value={form.etDate}
                    onChange={(e) => setField("etDate", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">CST No</label>
                  <input
                    className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    value={form.cstNo}
                    onChange={(e) => setField("cstNo", e.target.value)}
                    placeholder="CST No"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">CST Date</label>
                  <input
                    type="date"
                    className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    value={form.cstDate}
                    onChange={(e) => setField("cstDate", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Trade No</label>
                  <input
                    className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    value={form.tradeNo}
                    onChange={(e) => setField("tradeNo", e.target.value)}
                    placeholder="Trade Registration No"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-1">Website / URL</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      className="w-full pl-11 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                      value={form.website}
                      onChange={(e) => setField("website", e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Branch Details - repeatable */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Branch Details</h2>
                <button
                  type="button"
                  onClick={addBranch}
                  className="flex items-center gap-2 text-amber-700 font-semibold"
                >
                  <Plus size={16} />
                  Add Branch
                </button>
              </div>

              <div className="space-y-4">
                {form.branches.map((b, i) => (
                  <div key={i} className="p-4 border rounded-lg bg-amber-50/40 relative">
                    {form.branches.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBranch(i)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                        title="Remove branch"
                      >
                        <X size={16} />
                      </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Name</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={b.name}
                          onChange={(e) => updateBranch(i, "name", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Short Name</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={b.shortName}
                          onChange={(e) => updateBranch(i, "shortName", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Address</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={b.address}
                          onChange={(e) => updateBranch(i, "address", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Branch Head</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={b.branchHead}
                          onChange={(e) => updateBranch(i, "branchHead", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Mobile Number</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={b.mobile}
                          onChange={(e) => updateBranch(i, "mobile", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Email Address</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={b.email}
                          onChange={(e) => updateBranch(i, "email", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">State</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={b.state}
                          onChange={(e) => updateBranch(i, "state", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Location</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={b.location}
                          onChange={(e) => updateBranch(i, "location", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Type</label>
                        <select
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={b.type}
                          onChange={(e) => updateBranch(i, "type", e.target.value)}
                        >
                          <option>Main</option>
                          <option>Sub Branch</option>
                          <option>Area</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Depo / Godown Details - repeatable */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Depo / Godown Details</h2>
                <button
                  type="button"
                  onClick={addDepo}
                  className="flex items-center gap-2 text-amber-700 font-semibold"
                >
                  <Plus size={16} />
                  Add Depo
                </button>
              </div>

              <div className="space-y-4">
                {form.depos.map((d, i) => (
                  <div key={i} className="p-4 border rounded-lg bg-amber-50/40 relative">
                    {form.depos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDepo(i)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                        title="Remove depo"
                      >
                        <X size={16} />
                      </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Name</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={d.name}
                          onChange={(e) => updateDepo(i, "name", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Short Name</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={d.shortName}
                          onChange={(e) => updateDepo(i, "shortName", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Series Name</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={d.seriesName}
                          onChange={(e) => updateDepo(i, "seriesName", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Address</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={d.address}
                          onChange={(e) => updateDepo(i, "address", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Depo Head</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={d.depoHead}
                          onChange={(e) => updateDepo(i, "depoHead", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Mobile Number</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={d.mobile}
                          onChange={(e) => updateDepo(i, "mobile", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Email Address</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={d.email}
                          onChange={(e) => updateDepo(i, "email", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">State</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={d.state}
                          onChange={(e) => updateDepo(i, "state", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Location</label>
                        <input
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={d.location}
                          onChange={(e) => updateDepo(i, "location", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-1 block">Type</label>
                        <select
                          className="w-full pl-3 pr-3 py-2 border rounded-lg"
                          value={d.type}
                          onChange={(e) => updateDepo(i, "type", e.target.value)}
                        >
                          <option>Main</option>
                          <option>Sub</option>
                          <option>Area</option>
                          <option>Locality</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
                {/* Modules (checkboxes) */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-800">Enable Modules</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {modulesList.map((m) => (
                  <label key={m.id} className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.modules.includes(m.id)}
                      onChange={() => toggleModule(m.id)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{m.label}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Remarks */}
            <section>
              <label className="block text-sm text-gray-700 mb-1">Remarks</label>
              <textarea
                className="w-full pl-3 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none min-h-[64px]"
                value={form.remarks}
                onChange={(e) => setField("remarks", e.target.value)}
                placeholder="Optional notes"
              />
            </section>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg shadow-sm hover:shadow-md font-medium"
              >
                Create Organisation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

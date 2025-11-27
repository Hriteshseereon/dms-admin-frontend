// SalesSouda.jsx
import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Divider,
  Space,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
  FilterOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

/**
 * Use the multi-item JSON you provided (salesSoudaJSONModified2)
 * I include it here (trimmed/kept) — you can import from a separate file if you prefer.
 */
const salesSoudaJSONModified2 = {
  initialData: [
    {
      key: 1,
      soudaDate: "2025-10-01",
      deliveryDate: "2025-10-05",
      startDate: "2025-09-01",
      endDate: "2025-10-31",
      companyName: "ABC Oils Ltd",
      customer: "Bhubaneswar Market",
      customerEmail: "contact@bhubaneswarmarket.com",
      saleType: "Local",
      billType: "Tax Invoice",
      billMode: "Credit",
      transporter: "Blue Transport",
      location: "Warehouse A",
      depoName: "Depo A",
      brokerName: "Broker 1",
      type: "Retail",
      status: "Approved",
      items: [
        {
          lineKey: 1,
          item: "Mustard Oil",
          itemCode: "MUS001",
          uom: "Ltrs",
          qty: 2000,
          freeQty: 100,
          totalQty: 2100,
          rate: 125,
          discountPercent: 5,
          discountAmt: 100000,
          grossWt: 2100,
          totalGrossWt: 2100,
          grossAmount: 262500,
        },
        {
          lineKey: 2,
          item: "Sunflower Oil",
          itemCode: "SUN001",
          uom: "Ltrs",
          qty: 500,
          freeQty: 0,
          totalQty: 500,
          rate: 95,
          discountPercent: 2,
          discountAmt: 9500,
          grossWt: 500,
          totalGrossWt: 500,
          grossAmount: 47500,
        },
      ],
      orderTaxAndTotals: {
        grossAmountTotal: 310000,
        discountTotal: 109500,
        taxableAmount: 200500,
        sgstPercent: 5,
        cgstPercent: 5,
        igstPercent: 0,
        sgst: 10025,
        cgst: 10025,
        igst: 0,
        totalGST: 20050,
        tcsAmt: 500,
        grandTotal: 221050,
      },
      orderTotals: {
        qtyTotal: 2500,
        freeQtyTotal: 100,
        totalQty: 2600,
      },
    },
    {
      key: 2,
      soudaDate: "2025-11-15",
      deliveryDate: "2025-11-20",
      startDate: "2025-11-01",
      endDate: "2025-11-30",
      companyName: "ABC Oils Ltd",
      customer: "Cuttack Supermarket",
      customerEmail: "sales@cuttacksupermarket.com",
      saleType: "Interstate",
      billType: "Retail Invoice",
      billMode: "Cash",
      transporter: "Green Express",
      location: "Warehouse B",
      depoName: "Depo B",
      brokerName: "Broker 2",
      type: "Wholesale",
      status: "Pending",
      items: [
        {
          lineKey: 1,
          item: "Coconut Oil",
          itemCode: "COC001",
          uom: "Kg",
          qty: 1000,
          freeQty: 50,
          totalQty: 1050,
          rate: 150,
          discountPercent: 3,
          discountAmt: 4500,
          grossWt: 1050,
          totalGrossWt: 1050,
          grossAmount: 150000,
        },
        {
          lineKey: 2,
          item: "Mustard Oil",
          itemCode: "MUS001",
          uom: "Kg",
          qty: 200,
          freeQty: 0,
          totalQty: 200,
          rate: 130,
          discountPercent: 0,
          discountAmt: 0,
          grossWt: 200,
          totalGrossWt: 200,
          grossAmount: 26000,
        },
      ],
      orderTaxAndTotals: {
        grossAmountTotal: 176000,
        discountTotal: 4500,
        taxableAmount: 171500,
        sgstPercent: 0,
        cgstPercent: 0,
        igstPercent: 12,
        sgst: 0,
        cgst: 0,
        igst: 20580,
        totalGST: 20580,
        tcsAmt: 0,
        grandTotal: 192080,
      },
      orderTotals: {
        qtyTotal: 1200,
        freeQtyTotal: 50,
        totalQty: 1250,
      },
    },
  ],

  itemOptions: [
    { name: "Mustard Oil", code: "MUS001" },
    { name: "Sunflower Oil", code: "SUN001" },
    { name: "Coconut Oil", code: "COC001" },
    { name: "Groundnut Oil", code: "GND001" },
  ],

  uomOptions: ["Ltrs", "Kg", "Bottles"],

  statusOptions: ["Approved", "Pending", "Rejected"],

  typeOptions: ["Retail", "Wholesale"],

  locationOptions: ["Warehouse A", "Warehouse B", "Warehouse C"],

  depoOptions: ["Depo A", "Depo B", "Depo C"],

  brokerOptions: ["Broker 1", "Broker 2", "Broker 3"],

  saleTypeOptions: ["Local", "Interstate"],

  billTypeOptions: ["Tax Invoice", "Retail Invoice"],

  billModeOptions: ["Credit", "Cash"],

  transporterOptions: ["Blue Transport", "Green Express", "Fast Logistics"],
};

export default function SalesSouda() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [viewForm] = Form.useForm();

  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(salesSoudaJSONModified2.initialData);

  // filter - we keep your original behaviour but note item field is now inside items array
  const filteredData = data.filter((d) =>
    ["companyName", "customer", "status"].some((field) =>
      (d[field] || "").toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // ---------- Helper: compute per-item and order totals from form values ----------
  const computeFromFormValues = (values) => {
    // values: whole form values; we expect values.items = [{...}, {...}]
    const items = (values.items || []).map((it, idx) => {
      const qty = Number(it.qty || 0);
      const freeQty = Number(it.freeQty || 0);
      const rate = Number(it.rate || 0);
      const discountPercent = Number(it.discountPercent || 0);
      const grossWt = Number(it.grossWt || 0);

      const totalQty = qty + freeQty;
      const grossAmount = qty * rate;
      const discountAmt = (grossAmount * discountPercent) / 100;

      // Keep existing itemCode if set in the item selection
      return {
        ...it,
        lineKey: it.lineKey || idx + 1,
        totalQty,
        grossAmount,
        discountAmt,
        totalGrossWt: grossWt, // simple mapping
      };
    });

    // Order-level sums
    const grossAmountTotal = items.reduce((s, it) => s + Number(it.grossAmount || 0), 0);
    const discountTotal = items.reduce((s, it) => s + Number(it.discountAmt || 0), 0);
    const taxableAmount = grossAmountTotal - discountTotal;

    // tax percentages from the form (order-level fields)
    const sgstPercent = Number(values.orderTaxAndTotals?.sgstPercent || 0);
    const cgstPercent = Number(values.orderTaxAndTotals?.cgstPercent || 0);
    const igstPercent = Number(values.orderTaxAndTotals?.igstPercent || 0);
    const tcsAmt = Number(values.orderTaxAndTotals?.tcsAmt || 0);

    const sgst = (taxableAmount * sgstPercent) / 100;
    const cgst = (taxableAmount * cgstPercent) / 100;
    const igst = (taxableAmount * igstPercent) / 100;
    const totalGST = sgst + cgst + igst;

    const grandTotal = taxableAmount + totalGST + tcsAmt;

    // convenience totals
    const qtyTotal = items.reduce((s, it) => s + Number(it.qty || 0), 0);
    const freeQtyTotal = items.reduce((s, it) => s + Number(it.freeQty || 0), 0);
    const totalQty = qtyTotal + freeQtyTotal;

    return {
      items,
      orderTaxAndTotals: {
        grossAmountTotal,
        discountTotal,
        taxableAmount,
        sgstPercent,
        cgstPercent,
        igstPercent,
        sgst,
        cgst,
        igst,
        totalGST,
        tcsAmt,
        grandTotal,
      },
      orderTotals: {
        qtyTotal,
        freeQtyTotal,
        totalQty,
      },
    };
  };

  // ---------- Columns for main table ----------
  const columns = [
    {
      title: <span className="text-amber-700 font-semibold">Souda Date</span>,
      dataIndex: "soudaDate",
      width: 110,
      render: (text) => <span className="text-amber-800">{text ? dayjs(text).format("YYYY-MM-DD") : ""}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Delivery Date</span>,
      dataIndex: "deliveryDate",
      width: 110,
      render: (text) => <span className="text-amber-800">{text ? dayjs(text).format("YYYY-MM-DD") : ""}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Company</span>,
      dataIndex: "companyName",
      width: 140,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Customer</span>,
      dataIndex: "customer",
      width: 140,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Item(s)</span>,
      dataIndex: "items",
      width: 180,
      render: (items = []) => <span className="text-amber-800">{items.map((it) => it.item).join(", ")}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Status</span>,
      dataIndex: "status",
      width: 110,
      render: (status) => {
        const base = "px-3 py-1 rounded-full text-sm font-semibold";
        if (status === "Approved") return <span className={`${base} bg-green-100 text-green-700`}>Approved</span>;
        if (status === "Pending") return <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>;
        return <span className={`${base} bg-red-100 text-red-700`}>{status}</span>;
      },
    },
    {
      title: <span className="text-amber-700 font-semibold">Actions</span>,
      width: 120,
      render: (record) => (
        <div className="flex gap-3">
          <EyeOutlined
            className="cursor-pointer text-blue-500"
            onClick={() => {
              setSelectedRecord(record);
              // populate view form (read-only)
              viewForm.setFieldsValue({
                ...record,
                soudaDate: record.soudaDate ? dayjs(record.soudaDate) : undefined,
                deliveryDate: record.deliveryDate ? dayjs(record.deliveryDate) : undefined,
              });
              setIsViewModalOpen(true);
            }}
          />
          <EditOutlined
            className="cursor-pointer text-red-500"
            onClick={() => {
              setSelectedRecord(record);
              // load edit form values (convert dates)
              editForm.setFieldsValue({
                ...record,
                soudaDate: record.soudaDate ? dayjs(record.soudaDate) : undefined,
                deliveryDate: record.deliveryDate ? dayjs(record.deliveryDate) : undefined,
              });
              setIsEditModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  // ---------- Render: repeated Item rows as table inside the form ----------
  // We'll use Form.List to manage items; UI will look like a table header + rows.
  const ItemsTable = ({ form }) => {
  return (
    <Form.List name="items">
      {(fields, { add, remove }) => (
        <>
          <div className="mb-2 flex justify-between items-center">
            <h6 className="text-amber-500">Items</h6>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() =>
                add({
                  lineKey: new Date().getTime(),
                  item: undefined,
                  itemCode: undefined,
                  uom: undefined,
                  qty: 0,
                  freeQty: 0,
                  totalQty: 0,
                  rate: 0,
                  discountPercent: 0,
                  discountAmt: 0,
                  grossWt: 0,
                  totalGrossWt: 0,
                  grossAmount: 0,
                })
              }
            >
              Add Item
            </Button>
          </div>

          {fields.map((field, idx) => (
            <div key={field.key} className="mb-4 p-4 border rounded-lg bg-white shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <div className="text-amber-700 font-semibold">Item #{idx + 1}</div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-amber-600">Remove:</div>
                  
                  <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
                </div>
              </div>

              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    label={<span className="text-amber-700">Item</span>}
                    name={[field.name, "item"]}
                    fieldKey={[field.fieldKey, "item"]}
                    rules={[{ required: true, message: "Select item" }]}
                  >
                    <Select
                      placeholder="Select Item"
                      onChange={(val) => {
                        const selected = salesSoudaJSONModified2.itemOptions.find((it) => it.name === val);
                        form.setFields([{ name: ["items", field.name, "itemCode"], value: selected?.code }]);
                      }}
                    >
                      {salesSoudaJSONModified2.itemOptions.map((it) => (
                        <Select.Option key={it.code} value={it.name}>
                          {it.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                      <Col span={4}>
                      <Form.Item
                      label={<span className="text-amber-700">Code</span>}
                    name={[field.name, "itemCode"]}
                    fieldKey={[field.fieldKey, "itemCode"]}
                    style={{ margin: 0 }}
                  >
                    <Input placeholder="Code" disabled />
                  </Form.Item>
                      </Col>
                <Col span={4}>
                  <Form.Item
                    label={<span className="text-amber-700">UOM</span>}
                    name={[field.name, "uom"]}
                    fieldKey={[field.fieldKey, "uom"]}
                  >
                    <Select placeholder="UOM">
                      {salesSoudaJSONModified2.uomOptions.map((u) => (
                        <Select.Option key={u} value={u}>
                          {u}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    label={<span className="text-amber-700">Qty</span>}
                    name={[field.name, "qty"]}
                    fieldKey={[field.fieldKey, "qty"]}
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={0} className="w-full" />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    label={<span className="text-amber-700">Free Qty</span>}
                    name={[field.name, "freeQty"]}
                    fieldKey={[field.fieldKey, "freeQty"]}
                  >
                    <InputNumber min={0} className="w-full" />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    label={<span className="text-amber-700">Total Qty</span>}
                    name={[field.name, "totalQty"]}
                    fieldKey={[field.fieldKey, "totalQty"]}
                  >
                    <InputNumber className="w-full" disabled />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    label={<span className="text-amber-700">Rate (₹)</span>}
                    name={[field.name, "rate"]}
                    fieldKey={[field.fieldKey, "rate"]}
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={0} className="w-full" />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    label={<span className="text-amber-700">Discount %</span>}
                    name={[field.name, "discountPercent"]}
                    fieldKey={[field.fieldKey, "discountPercent"]}
                  >
                    <InputNumber min={0} max={100} className="w-full" />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    label={<span className="text-amber-700">Gross Amount (₹)</span>}
                    name={[field.name, "grossAmount"]}
                    fieldKey={[field.fieldKey, "grossAmount"]}
                  >
                    <InputNumber className="w-full" disabled />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    label={<span className="text-amber-700">Discount Amt (₹)</span>}
                    name={[field.name, "discountAmt"]}
                    fieldKey={[field.fieldKey, "discountAmt"]}
                  >
                    <InputNumber className="w-full" disabled />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    label={<span className="text-amber-700">Gross Wt</span>}
                    name={[field.name, "grossWt"]}
                    fieldKey={[field.fieldKey, "grossWt"]}
                  >
                    <InputNumber className="w-full" min={0} />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    label={<span className="text-amber-700">Total Gross Wt</span>}
                    name={[field.name, "totalGrossWt"]}
                    fieldKey={[field.fieldKey, "totalGrossWt"]}
                  >
                    <InputNumber className="w-full" disabled />
                  </Form.Item>
                </Col>

                  {/* <Col span={24}>
                    <Form.Item label={<span className="text-amber-700">Notes / Additional Info</span>} name={[field.name, "notes"]} fieldKey={[field.fieldKey, "notes"]}>
                      <Input placeholder="Optional notes" />
                    </Form.Item>
                  </Col> */}
              </Row>
            </div>
          ))}
        </>
      )}
    </Form.List>
  );
};


  // ---------- Add modal submit ----------
  const handleAddFinish = (values) => {
    // compute final payload
    const computed = computeFromFormValues(values);
    const payload = {
      ...values,
      items: computed.items,
      orderTaxAndTotals: computed.orderTaxAndTotals,
      orderTotals: computed.orderTotals,
      key: data.length + 1,
      soudaDate: values.soudaDate ? dayjs(values.soudaDate).format("YYYY-MM-DD") : undefined,
      deliveryDate: values.deliveryDate ? dayjs(values.deliveryDate).format("YYYY-MM-DD") : undefined,
    };
    setData((prev) => [...prev, payload]);
    setIsAddModalOpen(false);
    addForm.resetFields();
  };

  // ---------- Edit modal submit ----------
  const handleEditFinish = (values) => {
    const computed = computeFromFormValues(values);
    const payload = {
      ...values,
      items: computed.items,
      orderTaxAndTotals: computed.orderTaxAndTotals,
      orderTotals: computed.orderTotals,
      key: selectedRecord.key,
      soudaDate: values.soudaDate ? dayjs(values.soudaDate).format("YYYY-MM-DD") : undefined,
      deliveryDate: values.deliveryDate ? dayjs(values.deliveryDate).format("YYYY-MM-DD") : undefined,
    };

    setData((prev) => prev.map((d) => (d.key === payload.key ? payload : d)));
    setIsEditModalOpen(false);
    editForm.resetFields();
    setSelectedRecord(null);
  };

  // Keep form reactive: when values change, compute per-item and order totals and set them back into form
  const handleAddValuesChange = (_changed, allValues) => {
    const computed = computeFromFormValues(allValues || {});
    // set items computed (per-item computed fields) and orderTaxAndTotals & orderTotals
    addForm.setFieldsValue({
      items: computed.items,
      orderTaxAndTotals: {
        ...allValues.orderTaxAndTotals,
        ...computed.orderTaxAndTotals,
      },
      orderTotals: computed.orderTotals,
    });
  };

  const handleEditValuesChange = (_changed, allValues) => {
    const computed = computeFromFormValues(allValues || {});
    editForm.setFieldsValue({
      items: computed.items,
      orderTaxAndTotals: {
        ...allValues.orderTaxAndTotals,
        ...computed.orderTaxAndTotals,
      },
      orderTotals: computed.orderTotals,
    });
  };

  // When opening Edit modal we must populate the items into editForm as Form values (and convert dates)
  useEffect(() => {
    if (isEditModalOpen && selectedRecord) {
      // Convert dates to dayjs for DatePicker
      const preloaded = {
        ...selectedRecord,
        soudaDate: selectedRecord.soudaDate ? dayjs(selectedRecord.soudaDate) : undefined,
        deliveryDate: selectedRecord.deliveryDate ? dayjs(selectedRecord.deliveryDate) : undefined,
      };
      editForm.setFieldsValue(preloaded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditModalOpen, selectedRecord]);

  // When opening View modal we want read-only view - set viewForm fields (done in action click)

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2">
          <Input
            prefix={<SearchOutlined className="text-amber-600" />}
            placeholder="Search..."
            className="w-64 border-amber-300 focus:border-amber-500"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button icon={<FilterOutlined />} onClick={() => setSearchText("")} className="border-amber-400 text-amber-700 hover:bg-amber-100">
            Reset
          </Button>
        </div>
        <div className="flex gap-2">
          <Button icon={<DownloadOutlined />} className="border-amber-400 text-amber-700 hover:bg-amber-100">
            Export
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-amber-500 hover:bg-amber-600 border-none"
            onClick={() => {
              addForm.resetFields();
              // initialize with one empty item row to help user
              addForm.setFieldsValue({
                items: [
                  {
                    lineKey: new Date().getTime(),
                    qty: 0,
                    freeQty: 0,
                    totalQty: 0,
                    rate: 0,
                    discountPercent: 0,
                    discountAmt: 0,
                    grossWt: 0,
                    totalGrossWt: 0,
                    grossAmount: 0,
                  },
                ],
                orderTaxAndTotals: {
                  sgstPercent: 0,
                  cgstPercent: 0,
                  igstPercent: 0,
                  tcsAmt: 0,
                },
              });
              setIsAddModalOpen(true);
            }}
          >
            Add New
          </Button>
        </div>
      </div>

      <div className="border border-amber-300 rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold text-amber-700 mb-0">Sales Souda Records</h2>
        <p className="text-amber-600 mb-3">Manage your sales souda data</p>
        <Table columns={columns} dataSource={filteredData} pagination={false} scroll={{ y: 220 }} rowKey="key" />
      </div>

      {/* ------------- Add Modal ------------- */}
      <Modal
        title={<span className="text-amber-700 text-2xl font-semibold">Add Sales Souda</span>}
        open={isAddModalOpen}
        onCancel={() => {
          setIsAddModalOpen(false);
          addForm.resetFields();
        }}
        footer={null}
        width={920}
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={handleAddFinish}
          onValuesChange={handleAddValuesChange}
        >
          {/* Basic Info */}
          <h6 className="text-amber-500">Basic Information</h6>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Souda Date</span>} name="soudaDate" rules={[{ required: true }]} initialValue={dayjs()}>
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Delivery Date</span>} name="deliveryDate">
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Company Name</span>} name="companyName" rules={[{ required: true }]}>
                <Input placeholder="Enter Company Name" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Customer Name</span>} name="customer" rules={[{ required: true }]}>
                <Input placeholder="Enter Customer Name" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Customer Email</span>} name="customerEmail">
                <Input placeholder="Customer Email" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Status</span>} name="status" rules={[{ required: true }]}>
                <Select placeholder="Select Status">
                  {salesSoudaJSONModified2.statusOptions.map((s) => (
                    <Select.Option key={s} value={s}>
                      {s}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Location</span>} name="location">
                <Select placeholder="Select Location">
                  {salesSoudaJSONModified2.locationOptions.map((s) => (
                    <Select.Option key={s} value={s}>
                      {s}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Type</span>} name="type">
                <Select placeholder="Select Type">
                  {salesSoudaJSONModified2.typeOptions.map((s) => (
                    <Select.Option key={s} value={s}>
                      {s}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          {/* Items Table (Form.List) */}
          <ItemsTable form={addForm} />

          <Divider />

          {/* Order-level tax fields */}
          <h6 className="text-amber-500">Tax, Charges & Others</h6>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">SGST %</span>} name={["orderTaxAndTotals", "sgstPercent"]}>
                <InputNumber className="w-full" min={0} max={100} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">CGST %</span>} name={["orderTaxAndTotals", "cgstPercent"]}>
                <InputNumber className="w-full" min={0} max={100} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">IGST %</span>} name={["orderTaxAndTotals", "igstPercent"]}>
                <InputNumber className="w-full" min={0} max={100} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">TCS Amt (₹)</span>} name={["orderTaxAndTotals", "tcsAmt"]}>
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Gross Total (₹)</span>} name={["orderTaxAndTotals", "grossAmountTotal"]}>
                <InputNumber className="w-full" disabled />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Discount Total (₹)</span>} name={["orderTaxAndTotals", "discountTotal"]}>
                <InputNumber className="w-full" disabled />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Total GST (₹)</span>} name={["orderTaxAndTotals", "totalGST"]}>
                <InputNumber className="w-full" disabled />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Grand Total (₹)</span>} name={["orderTaxAndTotals", "grandTotal"]}>
                <InputNumber className="w-full" disabled />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => {
                setIsAddModalOpen(false);
                addForm.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </div>
        </Form>
      </Modal>

      {/* ------------- Edit Modal ------------- */}
      <Modal
        title="Edit Sales Souda"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          editForm.resetFields();
          setSelectedRecord(null);
        }}
        footer={null}
        width={920}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditFinish} onValuesChange={handleEditValuesChange}>
          {/* same structure as Add modal but using editForm */}
          <h6 className="text-amber-500">Basic Information</h6>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Souda Date</span>} name="soudaDate" rules={[{ required: true }]}>
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Delivery Date</span>} name="deliveryDate">
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Company Name</span>} name="companyName" rules={[{ required: true }]}>
                <Input placeholder="Enter Company Name" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Customer Name</span>} name="customer" rules={[{ required: true }]}>
                <Input placeholder="Enter Customer Name" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Customer Email</span>} name="customerEmail">
                <Input placeholder="Customer Email" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Status</span>} name="status" rules={[{ required: true }]}>
                <Select placeholder="Select Status">
                  {salesSoudaJSONModified2.statusOptions.map((s) => (
                    <Select.Option key={s} value={s}>
                      {s}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <ItemsTable form={editForm} />

          <Divider />

          <h6 className="text-amber-500">Tax, Charges & Others</h6>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">SGST %</span>} name={["orderTaxAndTotals", "sgstPercent"]}>
                <InputNumber className="w-full" min={0} max={100} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">CGST %</span>} name={["orderTaxAndTotals", "cgstPercent"]}>
                <InputNumber className="w-full" min={0} max={100} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">IGST %</span>} name={["orderTaxAndTotals", "igstPercent"]}>
                <InputNumber className="w-full" min={0} max={100} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">TCS Amt (₹)</span>} name={["orderTaxAndTotals", "tcsAmt"]}>
                <InputNumber className="w-full" min={0} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Gross Total (₹)</span>} name={["orderTaxAndTotals", "grossAmountTotal"]}>
                <InputNumber className="w-full" disabled />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Discount Total (₹)</span>} name={["orderTaxAndTotals", "discountTotal"]}>
                <InputNumber className="w-full" disabled />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Total GST (₹)</span>} name={["orderTaxAndTotals", "totalGST"]}>
                <InputNumber className="w-full" disabled />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Grand Total (₹)</span>} name={["orderTaxAndTotals", "grandTotal"]}>
                <InputNumber className="w-full" disabled />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => {
                setIsEditModalOpen(false);
                editForm.resetFields();
                setSelectedRecord(null);
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal>

      {/* ------------- View Modal (read-only) ------------- */}
      <Modal
        title="View Sales Souda"
        open={isViewModalOpen}
        onCancel={() => {
          setIsViewModalOpen(false);
          viewForm.resetFields();
        }}
        footer={null}
        width={920}
      >
        <Form layout="vertical" form={viewForm} initialValues={{}}>
          <h6 className="text-amber-500">Basic Information</h6>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Souda Date</span>} name="soudaDate">
                <DatePicker className="w-full" disabled />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Delivery Date</span>} name="deliveryDate">
                <DatePicker className="w-full" disabled />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Company Name</span>} name="companyName">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Customer Name</span>} name="customer">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Customer Email</span>} name="customerEmail">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Status</span>} name="status">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          {/* Simple read-only items table */}
          <h6 className="text-amber-500">Items</h6>
          <div className="mb-2 text-sm font-semibold text-amber-700 grid grid-cols-12 gap-2">
            <div className="col-span-4">Item</div>
            <div className="col-span-1">UOM</div>
            <div className="col-span-1">Qty</div>
            <div className="col-span-1">Free</div>
            <div className="col-span-1">Total</div>
            <div className="col-span-1">Rate</div>
            <div className="col-span-1">Disc %</div>
            <div className="col-span-1">Gross</div>
            <div className="col-span-1">Disc Amt</div>
            <div className="col-span-1">WT</div>
          </div>

          {/* render items from selectedRecord */}
          {(selectedRecord?.items || []).map((it) => (
            <div key={it.lineKey} className="grid grid-cols-12 gap-2 items-center py-2 border-b">
              <div className="col-span-4 text-amber-800">{it.item}</div>
              <div className="col-span-1 text-amber-800">{it.uom}</div>
              <div className="col-span-1 text-amber-800">{it.qty}</div>
              <div className="col-span-1 text-amber-800">{it.freeQty}</div>
              <div className="col-span-1 text-amber-800">{it.totalQty}</div>
              <div className="col-span-1 text-amber-800">{it.rate}</div>
              <div className="col-span-1 text-amber-800">{it.discountPercent}</div>
              <div className="col-span-1 text-amber-800">{it.grossAmount}</div>
              <div className="col-span-1 text-amber-800">{it.discountAmt}</div>
              <div className="col-span-1 text-amber-800">{it.totalGrossWt}</div>
            </div>
          ))}

          <Divider />

          <h6 className="text-amber-500">Tax, Charges & Others</h6>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">SGST %</span>} name={["orderTaxAndTotals", "sgstPercent"]}>
                <Input disabled value={selectedRecord?.orderTaxAndTotals?.sgstPercent} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">CGST %</span>} name={["orderTaxAndTotals", "cgstPercent"]}>
                <Input disabled value={selectedRecord?.orderTaxAndTotals?.cgstPercent} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">IGST %</span>} name={["orderTaxAndTotals", "igstPercent"]}>
                <Input disabled value={selectedRecord?.orderTaxAndTotals?.igstPercent} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">TCS Amt (₹)</span>} name={["orderTaxAndTotals", "tcsAmt"]}>
                <Input disabled value={selectedRecord?.orderTaxAndTotals?.tcsAmt} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Gross Total (₹)</span>} name={["orderTaxAndTotals", "grossAmountTotal"]}>
                <Input disabled value={selectedRecord?.orderTaxAndTotals?.grossAmountTotal} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Discount Total (₹)</span>} name={["orderTaxAndTotals", "discountTotal"]}>
                <Input disabled value={selectedRecord?.orderTaxAndTotals?.discountTotal} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Total GST (₹)</span>} name={["orderTaxAndTotals", "totalGST"]}>
                <Input disabled value={selectedRecord?.orderTaxAndTotals?.totalGST} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label={<span className="text-amber-700">Grand Total (₹)</span>} name={["orderTaxAndTotals", "grandTotal"]}>
                <Input disabled value={selectedRecord?.orderTaxAndTotals?.grandTotal} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

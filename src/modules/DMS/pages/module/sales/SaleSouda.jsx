// SalesSouda.jsx
import React, { useState } from "react";
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
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

// 🔹 JSON Data
const salesSoudaJSON = {
  initialData: [
    {
      key: 1,
      soudaDate: "2025-10-01",
      deliveryDate: "2024-03-21",
      companyName: "ABC Oils Ltd",
      customer: "Bhubaneswar Market",
      item: "Mustard Oil",
      qty: 2000,
      freeQty: 100,
      totalQty: 2100,
      rate: 125,
      discountPercent: 5,
      discountAmt: 100000,
      totalAmt: 250000,
      grossWt: 2100,
      totalGrossWt: 1020,
      grossAmount: 67080,
      sgstPercent: 5,
      cgstPercent: 5,
      igstPercent: 0,
      sgst: 3186,
      cgst: 3186,
      igst: 0,
      totalGST: 6372,
      tcsAmt: 500,
      uom: "Ltrs",
      status: "Approved",
      location: "Warehouse A",
      type: "Retail",
      brokerName: "Broker 1",
      depoName: "Depo A",
    },
  ],
  itemOptions: [
    { name: "Mustard Oil", code: "MUS001" },
    { name: "Sunflower Oil", code: "SUN001" },
    { name: "Coconut Oil", code: "COC001" },
  ],
  uomOptions: ["Ltrs", "Kg"],
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
  const [data, setData] = useState(salesSoudaJSON.initialData);

  const filteredData = data.filter((item) =>
    ["companyName", "customer", "item", "status"].some((field) =>
      item[field]?.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const calculateFinancialsFromValues = (values) => {
    const qty = Number(values.qty || 0);
    const freeQty = Number(values.freeQty || 0);
    const rate = Number(values.rate || 0);
    const discountPercent = Number(values.discountPercent || 0);
    const sgstPercent = Number(values.sgstPercent || 0);
    const cgstPercent = Number(values.cgstPercent || 0);
    const igstPercent = Number(values.igstPercent || 0);
    const tcsAmt = Number(values.tcsAmt || 0);
    const grossWt = Number(values.grossWt || 0);
    const totalQty = qty + freeQty;
    const grossAmount = qty * rate;
    const discountAmt = (grossAmount * discountPercent) / 100;
    const taxableAmount = grossAmount - discountAmt;
    const sgst = (taxableAmount * sgstPercent) / 100;
    const cgst = (taxableAmount * cgstPercent) / 100;
    const igst = (taxableAmount * igstPercent) / 100;
    const totalGST = sgst + cgst + igst;
    const totalAmt = taxableAmount + totalGST + tcsAmt;
    const totalGrossWt = grossWt;

    return {
      totalQty,
      discountAmt,
      grossAmount,
      sgst,
      cgst,
      igst,
      totalGST,
      totalAmt,
      tcsAmt,
      totalGrossWt,
    };
  };

  const columns = [
    {
      title: <span className="text-amber-700 font-semibold">Souda Date</span>,
      dataIndex: "soudaDate",
      width: 110,
      render: (text) => (
        <span className="text-amber-800">
          {text ? dayjs(text).format("YYYY-MM-DD") : ""}
        </span>
      ),
    },
    {
      title: (
        <span className="text-amber-700 font-semibold">Delivery Date</span>
      ),
      dataIndex: "deliveryDate",
      width: 110,
      render: (text) => (
        <span className="text-amber-800">
          {text ? dayjs(text).format("YYYY-MM-DD") : ""}
        </span>
      ),
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
      title: <span className="text-amber-700 font-semibold">Item</span>,
      dataIndex: "item",
      width: 120,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },

    {
      title: <span className="text-amber-700 font-semibold">Status</span>,
      dataIndex: "status",
      width: 110,
      render: (status) => {
        const base = "px-3 py-1 rounded-full text-sm font-semibold";
        if (status === "Approved")
          return (
            <span className={`${base} bg-green-100 text-green-700`}>
              Approved
            </span>
          );
        if (status === "Pending")
          return (
            <span className={`${base} bg-yellow-100 text-yellow-700`}>
              Pending
            </span>
          );
        return (
          <span className={`${base} bg-red-100 text-red-700`}>{status}</span>
        );
      },
    },
    {
      title: <span className="text-amber-700 font-semibold">Actions</span>,
      width: 90,
      render: (record) => (
        <div className="flex gap-3">
          <EyeOutlined
            className="cursor-pointer text-blue-500"
            onClick={() => {
              setSelectedRecord(record);
              viewForm.setFieldsValue({
                ...record,
                soudaDate: record.soudaDate
                  ? dayjs(record.soudaDate)
                  : undefined,
                deliveryDate: record.deliveryDate
                  ? dayjs(record.deliveryDate)
                  : undefined,
              });
              setIsViewModalOpen(true);
            }}
          />

          <EditOutlined
            className="cursor-pointer text-red-500"
            onClick={() => {
              setSelectedRecord(record);
              editForm.setFieldsValue({
                ...record,
                soudaDate: record.soudaDate
                  ? dayjs(record.soudaDate)
                  : undefined,
                deliveryDate: record.deliveryDate
                  ? dayjs(record.deliveryDate)
                  : undefined,
              });
              setIsEditModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  const renderFormFields = (form, disabled = false) => (
    <>
      <h6 className="text-amber-500">Basic Information</h6>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Souda Date</span>}
            name="soudaDate"
            rules={[{ required: true }]}
            initialValue={dayjs()}
          >
            <DatePicker className="w-full" disabled />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Delivery Date</span>}
            name="deliveryDate"
            rules={[{ required: true, message: "Please select Delivery Date" }]}
          >
            <DatePicker
              className="w-full"
              disabled={disabled}
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Company Name</span>}
            name="companyName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Company Name" disabled={disabled} />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Customer Name</span>}
            name="customer"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Customer Name" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Status</span>}
            name="status"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Status" disabled={disabled}>
              {salesSoudaJSON.statusOptions.map((s, idx) => (
                <Select.Option key={idx} value={s}>
                  {s}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Location</span>}
            name="location"
          >
            <Select placeholder="Select Location" disabled={disabled}>
              {salesSoudaJSON.locationOptions.map((s, idx) => (
                <Select.Option key={idx} value={s}>
                  {s}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Type</span>}
            name="type"
          >
            <Select placeholder="Select Type" disabled={disabled}>
              {salesSoudaJSON.typeOptions.map((s, idx) => (
                <Select.Option key={idx} value={s}>
                  {s}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Broker Name</span>}
            name="brokerName"
          >
            <Select placeholder="Select Broker" disabled={disabled}>
              {salesSoudaJSON.brokerOptions.map((s, idx) => (
                <Select.Option key={idx} value={s}>
                  {s}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Depo Name</span>}
            name="depoName"
          >
            <Select placeholder="Select Depo" disabled={disabled}>
              {salesSoudaJSON.depoOptions.map((s, idx) => (
                <Select.Option key={idx} value={s}>
                  {s}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* ---------------------- 🟧 CATEGORY 2: Item & Pricing Details ---------------------- */}
      <h6 className="text-amber-500">Item & Pricing Details</h6>
      <Row gutter={16}>
        {/* Item Name */}
        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Item Name</span>}
            name="item"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select Item"
              disabled={disabled}
              onChange={(value) => {
                const selected = salesSoudaJSON.itemOptions.find(
                  (it) => it.name === value
                );
                form.resetFields([
                  "qty",
                  "uom",
                  "freeQty",
                  "rate",
                  "discountPercent",
                  "grossWt",
                  "sgstPercent",
                  "cgstPercent",
                  "igstPercent",
                  "tcsAmt",
                  "totalQty",
                  "discountAmt",
                  "grossAmount",
                  "totalAmt",
                  "totalGrossWt",
                  "sgst",
                  "cgst",
                  "totalGST",
                ]);
                form.setFieldValue(
                  "itemCode",
                  selected ? selected.code : undefined
                );
              }}
            >
              {salesSoudaJSON.itemOptions.map((it, idx) => (
                <Select.Option key={idx} value={it.name}>
                  {it.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* Item Code (auto-filled, disabled) */}
        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Item Code</span>}
            name="itemCode"
          >
            <Input placeholder="Item Code" disabled />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">UOM</span>}
            name="uom"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select UOM" disabled={disabled}>
              {salesSoudaJSON.uomOptions.map((u, idx) => (
                <Select.Option key={idx} value={u}>
                  {u}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Qty</span>}
            name="qty"
            rules={[{ required: true }]}
          >
            <InputNumber
              className="w-full"
              placeholder="Qty"
              min={0}
              disabled={disabled}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Free Qty</span>}
            name="freeQty"
          >
            <InputNumber
              className="w-full"
              placeholder="Free Qty"
              min={0}
              disabled={disabled}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Total Qty</span>}
            name="totalQty"
          >
            <InputNumber className="w-full" placeholder="Total Qty" disabled />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Rate (₹)</span>}
            name="rate"
            rules={[{ required: true }]}
          >
            <InputNumber
              className="w-full"
              placeholder="Rate"
              min={0}
              disabled={disabled}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Discount %</span>}
            name="discountPercent"
          >
            <InputNumber
              className="w-full"
              min={0}
              max={100}
              disabled={disabled}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Discount Amt (₹)</span>}
            name="discountAmt"
          >
            <InputNumber className="w-full" disabled />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Gross Wt</span>}
            name="grossWt"
          >
            <InputNumber className="w-full" min={0} disabled={disabled} />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Total Gross Wt</span>}
            name="totalGrossWt"
          >
            <InputNumber className="w-full" disabled />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Gross Amount (₹)</span>}
            name="grossAmount"
          >
            <InputNumber className="w-full" disabled />
          </Form.Item>
        </Col>
      </Row>

      {/* ---------------------- 🟧 CATEGORY 3: Tax, Charges & Others ---------------------- */}
      <h6 className="text-amber-500">Tax, Charges & Others</h6>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">SGST %</span>}
            name="sgstPercent"
          >
            <InputNumber
              className="w-full"
              min={0}
              max={100}
              disabled={disabled}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">CGST %</span>}
            name="cgstPercent"
          >
            <InputNumber
              className="w-full"
              min={0}
              max={100}
              disabled={disabled}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">IGST %</span>}
            name="igstPercent"
          >
            <InputNumber
              className="w-full"
              min={0}
              max={100}
              disabled={disabled}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">SGST (₹)</span>}
            name="sgst"
          >
            <InputNumber className="w-full" disabled />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">CGST (₹)</span>}
            name="cgst"
          >
            <InputNumber className="w-full" disabled />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">IGST (₹)</span>}
            name="igst"
          >
            <InputNumber className="w-full" disabled />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Total GST (₹)</span>}
            name="totalGST"
          >
            <InputNumber className="w-full" disabled />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">TCS Amt (₹)</span>}
            name="tcsAmt"
          >
            <InputNumber className="w-full" min={0} disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={<span className="text-amber-700">Total Amount (₹)</span>}
            name="totalAmt"
          >
            <InputNumber className="w-full" disabled />
          </Form.Item>
        </Col>
      </Row>
    </>
  );

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
          <Button
            icon={<FilterOutlined />}
            onClick={() => setSearchText("")}
            className="border-amber-400 text-amber-700 hover:bg-amber-100"
          >
            Reset
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            icon={<DownloadOutlined />}
            className="border-amber-400 text-amber-700 hover:bg-amber-100"
          >
            Export
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-amber-500 hover:bg-amber-600 border-none"
            onClick={() => {
              addForm.resetFields();

              setIsAddModalOpen(true);
            }}
          >
            Add New
          </Button>
        </div>
      </div>

      <div className="border border-amber-300 rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold text-amber-700 mb-0">
          Sales Souda Records
        </h2>
        <p className="text-amber-600 mb-3">Manage your sales souda data</p>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          scroll={{ y: 220 }}
        />
      </div>

      {/* Add Modal */}
      <Modal
        title={
          <span className="text-amber-700 text-2xl font-semibold">
            Add Sales Souda
          </span>
        }
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
          onFinish={(values) => {
            const calcs = calculateFinancialsFromValues(values);
            const payload = { ...values, ...calcs, key: data.length + 1 };
            setData([...data, payload]);
            setIsAddModalOpen(false);
            addForm.resetFields();
          }}
          onValuesChange={(changed, allValues) => {
            const calcs = calculateFinancialsFromValues(allValues);
            addForm.setFieldsValue(calcs);
          }}
        >
          {renderFormFields(addForm, false)}

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

      <Modal
        title="Edit Sales Souda"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          editForm.resetFields();
        }}
        footer={null}
        width={920}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={(values) => {
            const calcs = calculateFinancialsFromValues(values);
            const payload = { ...values, ...calcs, key: selectedRecord.key };
            setData((prev) =>
              prev.map((d) => (d.key === payload.key ? payload : d))
            );
            setIsEditModalOpen(false);
            editForm.resetFields();
          }}
          onValuesChange={(changed, allValues) => {
            const calcs = calculateFinancialsFromValues(allValues);
            editForm.setFieldsValue(calcs);
          }}
        >
          {renderFormFields(editForm, false)}

          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => {
                setIsEditModalOpen(false);
                editForm.resetFields();
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

      {/* View Modal */}
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
        <Form form={viewForm} layout="vertical">
          {renderFormFields(viewForm, true)}
        </Form>
      </Modal>
    </div>
  );
}

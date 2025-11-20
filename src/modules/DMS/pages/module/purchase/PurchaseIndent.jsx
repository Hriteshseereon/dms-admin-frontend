// PurchaseIndent.jsx
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
  FilterOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const purchaseIndentJSON = {
  records: [
    {
      key: 1,
      soudaNo: "SOUDA-001",
      plantName: "Kalinga Oils Pvt. Ltd.",
      plantCode: "PC1",
      indentDate: "2024-10-01",
      deliveryDate: "2024-12-09",
      companyName: "Jay Traders",
      depoName: "Bhubaneswar Depot",
      item: "Mustard Oil",
      itemCode: "It1",
      qty: 5000,
      freeQty: 200,
      totalQty: 5200,
      uom: "Litre",
      rate: 120,
      discountPercent: 2,
      discountAmt: 12000,
      totalAmt: 588000,
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
      status: "Approved",
    },
    {
      key: 2,
      soudaNo: "SOUDA-002",
      plantName: "Oils Pvt. Ltd.",
      plantCode: "PC2",
      indentDate: "2024-1-01",
      deliveryDate: "2022-12-01",
      companyName: "Saheree Traders",
      depoName: "Aul Depot",
      item: "Cocanut Oil",
      itemCode: "It2",
      qty: 50900,
      freeQty: 10,
      totalQty: 100,
      uom: "Litre",
      rate: 140,
      discountPercent: 5,
      discountAmt: 2000,
      totalAmt: 88000,
      grossWt: 100,
      totalGrossWt: 100,
      grossAmount: 7080,
      sgstPercent: 50,
      cgstPercent: 52,
      igstPercent: 2,
      sgst: 186,
      cgst: 4186,
      igst: 4,
      totalGST: 372,
      tcsAmt: 440,
      status: "Pending",
    },
  ],
  uomOptions: ["Litre", "Kg", "Packet", "Box"],
  statusOptions: ["Approved", "Pending", "Rejected"],
  soudaNoOptions: ["SOUDA-001", "SOUDA-002", "SOUDA-003"],
};

export default function PurchaseIndent() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [data, setData] = useState(purchaseIndentJSON.records);
  const [searchText, setSearchText] = useState("");

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [viewForm] = Form.useForm();

  const handleSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setData(purchaseIndentJSON.records);
      return;
    }
    const filtered = data.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(value.toLowerCase())
    );
    setData(filtered);
  };

  const columns = [
    {
      title: <span className="text-amber-700 font-semibold">Plant Name</span>,
      dataIndex: "plantName",
      width: 100,
      render: (t) => <span className="text-amber-800">{t}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Indent Date</span>,
      dataIndex: "indentDate",
      width: 100,
      render: (t) => <span className="text-amber-800">{t}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Company Name</span>,
      dataIndex: "companyName",
      width: 100,
      render: (t) => <span className="text-amber-800">{t}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Item</span>,
      dataIndex: "item",
      width: 100,
      render: (t) => <span className="text-amber-800">{t}</span>,
    },
    {
      title: (
        <span className="text-amber-700 font-semibold">Delivery Date</span>
      ),
      dataIndex: "deliveryDate",
      width: 100,
      render: (t) => <span className="text-amber-800">{t}</span>,
    },

    {
      title: <span className="text-amber-700 font-semibold">Total Qty</span>,
      dataIndex: "totalQty",
      width: 100,
      render: (_, record) => (
        <span className="text-amber-800">
          {record.totalQty} {record.uom}
        </span>
      ),
    },
    {
      title: (
        <span className="text-amber-700 font-semibold">Total Amount (₹)</span>
      ),
      dataIndex: "totalAmt",
      width: 100,
      render: (t) => (
        <span className="text-amber-800">₹{t?.toLocaleString()}</span>
      ),
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
              {status}
            </span>
          );
        if (status === "Pending")
          return (
            <span className={`${base} bg-yellow-100 text-yellow-700`}>
              {status}
            </span>
          );
        return (
          <span className={`${base} bg-red-100 text-red-700`}>{status}</span>
        );
      },
    },
    {
      title: <span className="text-amber-700 font-semibold">Actions</span>,
      width: 100,
      render: (record) => (
        <div className="flex gap-3">
          <EyeOutlined
            className="cursor-pointer text-blue-500"
            onClick={() => {
              setSelectedRecord(record);
              viewForm.setFieldsValue({
                ...record,
                indentDate: dayjs(record.indentDate, "YYYY-MM-DD"),
                deliveryDate: dayjs(record.deliveryDate, "YYYY-MM-DD"),
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
                indentDate: dayjs(record.indentDate, "YYYY-MM-DD"),
                deliveryDate: dayjs(record.deliveryDate, "YYYY-MM-DD"),
              });

              setIsEditModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

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

  const handleAutoCalculate = (formInstance) => {
    if (!formInstance) return;
    const values = formInstance.getFieldsValue(true);
    const results = calculateFinancialsFromValues(values);
    formInstance.setFieldsValue(results);
  };

  const handleFormSubmit = (values, type) => {
    const payload = {
      ...values,
      indentDate: values.indentDate
        ? values.indentDate.format("YYYY-MM-DD")
        : null,
      deliveryDate: values.deliveryDate
        ? values.deliveryDate.format("YYYY-MM-DD")
        : null,
    };

    if (type === "edit" && selectedRecord) {
      setData((prev) =>
        prev.map((i) =>
          i.key === selectedRecord.key ? { ...payload, key: i.key } : i
        )
      );
      setIsEditModalOpen(false);
      editForm.resetFields();
    } else {
      setData((prev) => [...prev, { ...payload, key: prev.length + 1 }]);
      setIsAddModalOpen(false);
      addForm.resetFields();
    }
  };

  const renderFormFields = (formInstance, disabled = false) => (
    <>
      <h6 className=" text-amber-500 ">Basic Information</h6>
      <Row gutter={16}>
        <Col span={4}>
          <Form.Item
            label="Souda No"
            name="soudaNo"
            rules={[{ required: true, message: "Please select Souda No" }]}
          >
            <Select
              placeholder="Select Souda No"
              disabled={disabled}
              onChange={(value) => {
                const selectedSouda = purchaseIndentJSON.records.find(
                  (r) => r.soudaNo === value
                );
                if (selectedSouda && formInstance) {
                  formInstance.setFieldsValue({
                    plantName: selectedSouda.plantName,
                    plantCode: selectedSouda.plantCode,
                    companyName: selectedSouda.companyName,
                    depoName: selectedSouda.depoName,
                    item: selectedSouda.item,
                    itemCode: selectedSouda.itemCode,
                  });
                  handleAutoCalculate(formInstance);
                }
              }}
            >
              {purchaseIndentJSON.soudaNoOptions.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Plant Name" name="plantName">
            <Input disabled placeholder="Auto filled" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Plant Code" name="plantCode">
            <Input disabled placeholder="Auto filled"></Input>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Company Name" name="companyName">
            <Input disabled placeholder="Auto filled" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Depo Name" name="depoName">
            <Input disabled placeholder="Auto filled" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Indent Date"
            name="indentDate"
            initialValue={dayjs()}
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" disabled />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            label="Delivery Date"
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
      </Row>

      <h6 className=" text-amber-500 ">Item & Pricing Details</h6>

      <Row gutter={12}>
        <Col span={4}>
          <Form.Item label="Item Name" name="item">
            <Input disabled placeholder="Auto filled" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Item Code" name="itemCode">
            <Input disabled placeholder="Auto filled"></Input>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Qty" name="qty">
            <InputNumber
              className="w-full"
              disabled={disabled}
              onChange={() => handleAutoCalculate(formInstance)}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Free Qty" name="freeQty">
            <InputNumber
              className="w-full"
              disabled={disabled}
              onChange={() => handleAutoCalculate(formInstance)}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Total Qty" name="totalQty">
            <InputNumber className="w-full bg-gray-50" disabled />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="UOM" name="uom">
            <Select placeholder="Select UOM" disabled={disabled}>
              {purchaseIndentJSON.uomOptions.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Rate" name="rate">
            <InputNumber
              className="w-full"
              disabled={disabled}
              onChange={() => handleAutoCalculate(formInstance)}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Dis%" name="discountPercent">
            <InputNumber
              className="w-full"
              disabled={disabled}
              onChange={() => handleAutoCalculate(formInstance)}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Dis Amt" name="discountAmt">
            <InputNumber className="w-full bg-gray-50" disabled />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Gross Wt" name="grossWt">
            <InputNumber
              className="w-full"
              disabled={disabled}
              onChange={() => handleAutoCalculate(formInstance)}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Total Gross Wt" name="totalGrossWt">
            <InputNumber className="w-full bg-gray-50" disabled />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Gross Amount (₹)" name="grossAmount">
            <InputNumber className="w-full bg-gray-50" disabled />
          </Form.Item>
        </Col>
      </Row>
      <h6 className=" text-amber-500 ">Tax, Charges & Others</h6>
      <Row gutter={12}>
        <Col span={4}>
          <Form.Item label="SGST %" name="sgstPercent">
            <InputNumber
              className="w-full"
              disabled={disabled}
              onChange={() => handleAutoCalculate(formInstance)}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="CGST %" name="cgstPercent">
            <InputNumber
              className="w-full"
              disabled={disabled}
              onChange={() => handleAutoCalculate(formInstance)}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="IGST %" name="igstPercent">
            <InputNumber
              className="w-full"
              disabled={disabled}
              onChange={() => handleAutoCalculate(formInstance)}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="SGST (₹)" name="sgst">
            <InputNumber className="w-full bg-gray-50" disabled />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="CGST (₹)" name="cgst">
            <InputNumber className="w-full bg-gray-50" disabled />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="IGST (₹)" name="igst">
            <InputNumber className="w-full bg-gray-50" disabled />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Total GST (₹)" name="totalGST">
            <InputNumber className="w-full bg-gray-50" disabled />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="TCS Amt (₹)" name="tcsAmt">
            <InputNumber
              className="w-full"
              disabled={disabled}
              onChange={() => handleAutoCalculate(formInstance)}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Total Amount (₹)" name="totalAmt">
            <InputNumber className="w-full bg-gray-50" disabled />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select placeholder="Select Status" disabled={disabled}>
              {purchaseIndentJSON.statusOptions.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Input
            prefix={<SearchOutlined className="text-amber-600" />}
            placeholder="Search..."
            className="w-64 border-amber-300"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button
            icon={<FilterOutlined />}
            className="border-amber-400 text-amber-700 hover:bg-amber-100"
            onClick={() => handleSearch("")}
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

      {/* Table */}
      <div className="border border-amber-300 rounded-lg p-4 shadow-md bg-white">
        <h2 className="text-lg font-semibold text-amber-700 mb-0">
          Purchase Indent Records
        </h2>
        <p className="text-amber-600 mb-3">Manage your purchase souda data</p>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ y: 180 }}
        />
      </div>
      <Modal
        title={
          <span className="text-amber-700 text-2xl font-semibold">
            Add New Purchase Indent
          </span>
        }
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
        width={1000}
      >
        <Form
          layout="vertical"
          form={addForm}
          onFinish={(values) => handleFormSubmit(values, "add")}
        >
          {renderFormFields(addForm, false)}
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-amber-500 border-none"
            >
              Add
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal
        title={
          <span className="text-amber-700 text-2xl font-semibold">
            Edit Purchase Indent
          </span>
        }
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        width={1000}
      >
        <Form
          layout="vertical"
          form={editForm}
          onFinish={(values) => handleFormSubmit(values, "edit")}
        >
          {renderFormFields(editForm, false)}
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-amber-500 border-none"
            >
              Update
            </Button>
          </div>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal
        title={
          <span className="text-amber-700 text-2xl font-semibold">
            View Purchase Indent
          </span>
        }
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        width={1000}
      >
        <Form layout="vertical" form={viewForm}>
          {renderFormFields(viewForm, true)}
        </Form>
      </Modal>
    </div>
  );
}

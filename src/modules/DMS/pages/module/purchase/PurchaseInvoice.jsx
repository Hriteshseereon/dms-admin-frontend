// PurchaseInvoice.jsx
import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  Select,
  DatePicker,
  Row,
  Col,
  message,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

// 🔹 JSON Data
const purchaseInvoiceJSON = {
  records: [
    {
      key: 1,
      indentNo: "IND-PO-001",
      soudaNo: "SOU-001",
      itemName: "Palm Oil",
      itemCode: "It1",
      qty: 1000,
      freeQty: 0,
      totalQty: 1000,
      rate: 60,
      uom: "Ltr",
      customerName: "Kalinga Retail",
      totalAmount: 67580.0,
      discountPercent: 5,
      discountAmount: 3000.0,
      sgstPercent: 5.0,
      cgstPercent: 5.0,
      igstPercent: 0.0,
      sgst: 3000.0,
      cgst: 3000.0,
      igst: 0,
      totalGST: 6000.0,
      tcsAmt: 500,
      grossWt: 1000.0,
      totalGrossWt: 1000.0,
      grossAmount: 60000.0,
      status: "Pending",
      purchaseType: "Local",
      receiveDate: "2024-03-21",
      companyName: "Kalinga Oil Mills",
      billType: "Tax Invoice",
      waybillNo: "WB-001",
      billMode: "Credit",
      depot: "Bhubaneswar Depot",
      plantName: "Plant A",
      plantCode: "PL1",
      deliveryDate: "2024-03-21",
      depoName: "Bhubaneswar Depo",
    },
  ],
  options: {
    uomOptions: ["Ltr", "Kg", "Ton"],
    statusOptions: ["Approved", "Pending", "Rejected"],
    purchaseTypeOptions: ["Local", "Import"],
    companyOptions: ["Kalinga Oil Mills", "Odisha Edibles"],
    billTypeOptions: ["Tax Invoice", "Regular Invoice"],
    billModeOptions: ["Credit", "Cash"],
    indentOptions: ["IND-PO-001", "IND-PO-002", "IND-PO-003"],
    soudaOptions: ["SOU-001", "SOU-002", "SOU-003"],
    plantOptions: [
      { name: "Kalinga Oils Pvt. Ltd.", code: "PA" },
      { name: "Odisha Edibles", code: "Sunrise Foods" },
    ],
    itemOptions: [
      { name: "Palm Oil", code: "It1" },
      { name: "Sunflower Oil", code: "It2" },
      { name: "Coconut Oil", code: "It3" },
    ],

    depoOptions: ["Bhubaneswar Depo", "Cuttack Depo"],
  },
};

export default function PurchaseInvoice() {
  const [data, setData] = useState(purchaseInvoiceJSON.records);
  const [searchText, setSearchText] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [viewForm] = Form.useForm();

  // Search handler
  const handleSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setData(purchaseInvoiceJSON.records);
    } else {
      const filtered = purchaseInvoiceJSON.records.filter((item) =>
        Object.values(item).some((field) =>
          String(field).toLowerCase().includes(value.toLowerCase())
        )
      );
      setData(filtered);
    }
  };

  const columns = [
    {
      title: <span className="text-amber-700 font-semibold">Souda No</span>,
      dataIndex: "soudaNo",
      width: 100,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Indent No</span>,
      dataIndex: "indentNo",
      width: 100,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },

    {
      title: <span className="text-amber-700 font-semibold">Item Name</span>,
      dataIndex: "itemName",
      width: 100,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Total Qty</span>,
      dataIndex: "totalQty",
      width: 80,
      render: (text, record) => (
        <span className="text-amber-800">
          {record.totalQty} {record.uom}
        </span>
      ),
    },

    {
      title: <span className="text-amber-700 font-semibold">Total Amount</span>,
      dataIndex: "totalAmount",
      width: 100,
      render: (text) => <span className="text-amber-800 ">{text}</span>,
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
          <span className={`${base} bg-red-200 text-red-700`}>{status}</span>
        );
      },
    },

    {
      title: <span className="text-amber-700 font-semibold">Actions</span>,
      width: 80,
      render: (record) => (
        <div className="flex gap-3">
          <EyeOutlined
            className="cursor-pointer text-blue-500"
            onClick={() => {
              setSelectedRecord(record);
              viewForm.setFieldsValue({
                ...record,
                invoiceDate: record.invoiceDate
                  ? dayjs(record.invoiceDate)
                  : null,
                receiveDate: record.receiveDate
                  ? dayjs(record.receiveDate)
                  : null,
                indentDate: record.indentDate ? dayjs(record.indentDate) : null,
                deliveryDate: record.deliveryDate
                  ? dayjs(record.deliveryDate)
                  : null,
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
                invoiceDate: record.invoiceDate
                  ? dayjs(record.invoiceDate)
                  : null,
                receiveDate: record.receiveDate
                  ? dayjs(record.receiveDate)
                  : null,
                indentDate: record.indentDate ? dayjs(record.indentDate) : null,
                deliveryDate: record.deliveryDate
                  ? dayjs(record.deliveryDate)
                  : null,
              });

              setIsEditModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];
  const handleFormSubmit = (values) => {
    const payload = {
      ...values,
      invoiceDate: values.invoiceDate
        ? dayjs(values.invoiceDate).format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD"),
      receiveDate: values.receiveDate
        ? dayjs(values.receiveDate).format("YYYY-MM-DD")
        : null,
      indentDate: values.indentDate
        ? dayjs(values.indentDate).format("YYYY-MM-DD")
        : null,
      deliveryDate: values.deliveryDate
        ? dayjs(values.deliveryDate).format("YYYY-MM-DD")
        : null,
    };

    if (isEditModalOpen) {
      setData((prev) =>
        prev.map((item) =>
          item.key === selectedRecord.key ? { ...payload, key: item.key } : item
        )
      );
      message.success(`Indent ${payload.indentNo} updated successfully!`);
      editForm.resetFields();
      setIsEditModalOpen(false);
    }
    // If add modal is open
    else if (isAddModalOpen) {
      setData((prev) => [...prev, { ...payload, key: prev.length + 1 }]);
      message.success(`Indent ${payload.indentNo} added successfully!`);
      addForm.resetFields();
      setIsAddModalOpen(false);
    }
  };

  const renderFormFields = (disabled = false) => (
    <>
      <h6 className=" text-amber-500 ">Basic Information</h6>{" "}
      <Row gutter={24}>
        <Col span={4}>
          <Form.Item
            label="Souda No"
            name="soudaNo"
            rules={[{ required: false }]}
          >
            <Select disabled={disabled} placeholder="Select Souda No">
              {purchaseInvoiceJSON.options.soudaOptions.map((val) => (
                <Select.Option key={val} value={val}>
                  {val}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Indent No"
            name="indentNo"
            rules={[{ required: true }]}
          >
            <Select disabled={disabled} placeholder="Select Indent No">
              {purchaseInvoiceJSON.options.indentOptions.map((val) => (
                <Select.Option key={val} value={val}>
                  {val}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Plant Name"
            name="plantName"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select Plant"
              disabled={disabled}
              onChange={(value) => {
                const selectedPlant =
                  purchaseInvoiceJSON.options.plantOptions.find(
                    (p) => p.name === value
                  );
                const activeForm = isEditModalOpen
                  ? editForm
                  : isAddModalOpen
                  ? addForm
                  : viewForm;
                activeForm.setFieldsValue({
                  plantCode: selectedPlant ? selectedPlant.code : "",
                });
              }}
            >
              {purchaseInvoiceJSON.options.plantOptions.map((opt) => (
                <Option key={opt.name} value={opt.name}>
                  {opt.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Plant Code" name="plantCode">
            <Input disabled placeholder="Auto filled" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true }]}
          >
            <Select disabled={disabled} placeholder="Select Company Name">
              {purchaseInvoiceJSON.options.companyOptions.map((val) => (
                <Select.Option key={val} value={val}>
                  {val}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Depo Name"
            name="depoName"
            rules={[{ required: true }]}
          >
            <Select disabled={disabled} placeholder="Select Depo Name">
              {purchaseInvoiceJSON.options.depoOptions.map((val) => (
                <Select.Option key={val} value={val}>
                  {val}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={4}>
          <Form.Item label="Invoice Date" name="invoiceDate">
            <DatePicker className="w-full" disabled format="YYYY-MM-DD" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Delivery Date"
            name="deliveryDate"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Purchase Type"
            name="purchaseType"
            rules={[{ required: true }]}
          >
            <Select disabled={disabled} placeholder="Select Type">
              {purchaseInvoiceJSON.options.purchaseTypeOptions.map((val) => (
                <Select.Option key={val} value={val}>
                  {val}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Bill Type"
            name="billType"
            rules={[{ required: true }]}
          >
            <Select disabled={disabled} placeholder="Select Bill Type">
              {purchaseInvoiceJSON.options.billTypeOptions.map((val) => (
                <Select.Option key={val} value={val}>
                  {val}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Bill Mode"
            name="billMode"
            rules={[{ required: true }]}
          >
            <Select disabled={disabled} placeholder="Select Bill Mode">
              {purchaseInvoiceJSON.options.billModeOptions.map((val) => (
                <Select.Option key={val} value={val}>
                  {val}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Waybill No"
            name="waybillNo"
            rules={[{ required: false }]}
          >
            <Input disabled={disabled} />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select placeholder="Select Status" disabled={disabled}>
              {purchaseInvoiceJSON.options.statusOptions.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <h6 className=" text-amber-500 ">Item & Pricing Details</h6>
      <Row gutter={24}>
        <Col span={4}>
          <Form.Item
            label="Item Name"
            name="itemName"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select Item"
              disabled={disabled}
              onChange={(value) => {
                const selectedItem =
                  purchaseInvoiceJSON.options.itemOptions.find(
                    (item) => item.name === value
                  );
                const activeForm = isEditModalOpen
                  ? editForm
                  : isAddModalOpen
                  ? addForm
                  : viewForm;
                activeForm.setFieldsValue({
                  itemCode: selectedItem ? selectedItem.code : "",
                });
              }}
            >
              {purchaseInvoiceJSON.options.itemOptions.map((opt) => (
                <Option key={opt.name} value={opt.name}>
                  {opt.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Item Code" name="itemCode">
            <Input disabled placeholder="Auto filled" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Qty" name="qty" rules={[{ required: true }]}>
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Free Qty"
            name="freeQty"
            rules={[{ required: false }]}
          >
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Total Qty"
            name="totalQty"
            rules={[{ required: true }]}
          >
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="UOM" name="uom" rules={[{ required: false }]}>
            <Select disabled={disabled} placeholder="Select UOM">
              {purchaseInvoiceJSON.options.uomOptions.map((val) => (
                <Select.Option key={val} value={val}>
                  {val}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Rate" name="rate" rules={[{ required: true }]}>
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={4}>
          <Form.Item
            label="Dis%"
            name="discountPercent"
            rules={[{ required: false }]}
          >
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Dis Amt"
            name="discountAmount"
            rules={[{ required: false }]}
          >
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Gross Wt"
            name="grossWt"
            rules={[{ required: false }]}
          >
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Total Gross Wt"
            name="totalGrossWt"
            rules={[{ required: false }]}
          >
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Gross Amount (₹)"
            name="grossAmount"
            rules={[{ required: true }]}
          >
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>
      <h6 className=" text-amber-500 ">Tax, Charges & Others</h6>
      <Row gutter={24}>
        <Col span={4}>
          <Form.Item
            label="SGST %"
            name="sgstPercent"
            rules={[{ required: false }]}
          >
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="CGST %"
            name="cgstPercent"
            rules={[{ required: false }]}
          >
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="IGST %"
            name="igstPercent"
            rules={[{ required: false }]}
          >
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="SGST (₹)" name="sgst" rules={[{ required: false }]}>
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="CGST (₹)" name="cgst" rules={[{ required: false }]}>
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="IGST (₹)" name="igst" rules={[{ required: false }]}>
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={4}>
          <Form.Item
            label="Total GST (₹)"
            name="totalGST"
            rules={[{ required: false }]}
          >
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="TCS Amt (₹)"
            name="tcsAmt"
            rules={[{ required: false }]}
          >
            <Input type="number" disabled={disabled} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Total Amount (₹)"
            name="totalAmount"
            rules={[{ required: true }]}
          >
            <Input type="number" disabled={disabled} />
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
            className="w-64 border-amber-300 focus:border-amber-500"
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
              addForm.setFieldsValue({ invoiceDate: dayjs() });
              setIsAddModalOpen(true);
            }}
          >
            Add New
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-amber-300 rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold text-amber-700 mb-0">
          Purchase Indent Records
        </h2>
        <p className="text-amber-600 mb-3">Manage your purchase indent data</p>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ y: 180 }}
        />
      </div>

      {/* ➤ Add Modal */}
      <Modal
        title={
          <span className="text-amber-700 text-2xl font-semibold">
            Add New Purchase Invoice
          </span>
        }
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
        width={1200}
      >
        <Form
          layout="vertical"
          form={addForm}
          onFinish={handleFormSubmit}
          onFinishFailed={(err) =>
            console.log("❌ Add form validation failed:", err)
          }
        >
          {renderFormFields(false)}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => setIsAddModalOpen(false)}
              className="border-amber-400 text-amber-700 hover:bg-amber-100"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-amber-500 hover:bg-amber-600 border-none"
            >
              Add
            </Button>
          </div>
        </Form>
      </Modal>

      {/* ➤ Edit Modal */}
      <Modal
        title={
          <span className="text-amber-700 text-2xl font-semibold">
            Edit Purchase Indent
          </span>
        }
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        width={1200}
      >
        <Form
          layout="vertical"
          form={editForm}
          onFinish={handleFormSubmit}
          onFinishFailed={(err) =>
            console.log("❌ Edit form validation failed:", err)
          }
        >
          {renderFormFields(false)}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => setIsEditModalOpen(false)}
              className="border-amber-400 text-amber-700 hover:bg-amber-100"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-amber-500 hover:bg-amber-600 border-none"
            >
              Update
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title={
          <span className="text-amber-700 text-2xl font-semibold">
            View Purchase Indent
          </span>
        }
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        width={1200}
      >
        <Form layout="vertical" form={viewForm}>
          {renderFormFields(true)}
        </Form>
      </Modal>
    </div>
  );
}

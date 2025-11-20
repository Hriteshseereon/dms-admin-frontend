// PurchaseSouda.jsx
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

const purchaseSoudaJSON = {
  records: [
    {
      key: 1,
      plantName: "Kalinga Oils Pvt. Ltd.",
      plantCode: "PLT001",
      soudaDate: "2024-10-01",
      deliveryDate: "2024-12-09",
      companyName: "Jay Traders",
      depoName: "Bhubaneswar Depot",
      item: "Mustard Oil",
      itemCode: "Item1",
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
  ],
  plantOptions: [
    { name: "Kalinga Oils Pvt. Ltd.", code: "PA" },
    { name: "Odisha Edibles", code: "Sunrise Foods" },
  ],
  depoOptions: ["Bhubaneswar Depot", "Cuttack Depot", "Sambalpur Depot"],
  itemOptions: [
    { name: "Mustard Oil", code: "It1" },
    { name: "Refined Oil", code: "It2" },
    { name: "Sunflower Oil", code: "It3" },
  ],
  uomOptions: ["Litre", "Kg", "Packet", "Box"],
  statusOptions: ["Approved", "Pending", "Rejected"],
};

export default function PurchaseSouda() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [data, setData] = useState(purchaseSoudaJSON.records);
  const [searchText, setSearchText] = useState("");

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [viewForm] = Form.useForm();

  const handleSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setData(purchaseSoudaJSON.records);
      return;
    }
    const filtered = purchaseSoudaJSON.records.filter((item) =>
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
      title: <span className="text-amber-700 font-semibold">Souda Date</span>,
      dataIndex: "soudaDate",
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
      render: (_, t) => (
        <span className="text-amber-800">
          {t.totalQty} {t.uom}
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
          <span className={`${base} bg-red-200 text-red-700`}>{status}</span>
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
                soudaDate: dayjs(record.soudaDate),
                deliveryDate: dayjs(record.deliveryDate),
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
                soudaDate: dayjs(record.soudaDate),
                deliveryDate: dayjs(record.deliveryDate),
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

  const handleAutoCalculate = () => {
    let activeForm = addForm;
    if (isEditModalOpen) activeForm = editForm;
    if (isViewModalOpen) activeForm = viewForm;

    const values = activeForm.getFieldsValue();
    const results = calculateFinancialsFromValues(values);
    activeForm.setFieldsValue(results);
  };

  const handleFormSubmit = (values) => {
    const payload = {
      ...values,
      soudaDate: dayjs().format("YYYY-MM-DD"),
      deliveryDate: dayjs(values.deliveryDate).format("YYYY-MM-DD"),
    };

    if (isEditModalOpen) {
      setData((prev) =>
        prev.map((i) =>
          i.key === selectedRecord.key ? { ...payload, key: i.key } : i
        )
      );
      editForm.resetFields();
    } else {
      setData((prev) => [...prev, { ...payload, key: prev.length + 1 }]);
      addForm.resetFields();
    }

    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const renderFormFields = (disabled = false) => (
    <>
      <h6 className=" text-amber-500 ">Basic Information</h6>
      <Row gutter={16}>
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
                const selectedPlant = purchaseSoudaJSON.plantOptions.find(
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
              {purchaseSoudaJSON.plantOptions.map((opt) => (
                <Option key={opt.name} value={opt.name}>
                  {opt.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Plant Code" name="plantCode">
            <Select placeholder="Plant Code" disabled></Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Company Name" disabled={disabled} />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            label="Depo Name"
            name="depoName"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Depot" disabled={disabled}>
              {purchaseSoudaJSON.depoOptions.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Souda Date" name="soudaDate" initialValue={dayjs()}>
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
          <Form.Item label="Item Name" name="item" rules={[{ required: true }]}>
            <Select
              placeholder="Select Plant"
              disabled={disabled}
              onChange={(value) => {
                const selectedItem = purchaseSoudaJSON.itemOptions.find(
                  (p) => p.name === value
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
              {purchaseSoudaJSON.itemOptions.map((opt) => (
                <Option key={opt.name} value={opt.name}>
                  {opt.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Item Code" name="itemCode">
            <Select placeholder="Item Code" disabled></Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Qty" name="qty">
            <InputNumber
              className="w-full"
              disabled={disabled}
              onChange={handleAutoCalculate}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Free Qty" name="freeQty">
            <InputNumber
              className="w-full"
              disabled={disabled}
              onChange={handleAutoCalculate}
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
              {purchaseSoudaJSON.uomOptions.map((opt) => (
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
              onChange={handleAutoCalculate}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Dis%" name="discountPercent">
            <InputNumber
              className="w-full"
              disabled={disabled}
              onChange={handleAutoCalculate}
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
              onChange={handleAutoCalculate}
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
              onChange={handleAutoCalculate}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="CGST %" name="cgstPercent">
            <InputNumber
              className="w-full"
              disabled={disabled}
              onChange={handleAutoCalculate}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="IGST %" name="igstPercent">
            <InputNumber
              className="w-full"
              disabled={disabled}
              onChange={handleAutoCalculate}
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
              onChange={handleAutoCalculate}
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
              {purchaseSoudaJSON.statusOptions.map((opt) => (
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
          Purchase Souda Records
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
            Add New Purchase Souda
          </span>
        }
        open={isAddModalOpen}
        onCancel={() => {
          addForm.resetFields();
          setIsAddModalOpen(false);
        }}
        footer={null}
        width={1000}
      >
        <Form layout="vertical" form={addForm} onFinish={handleFormSubmit}>
          {renderFormFields(false)}
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
            Edit Purchase Souda
          </span>
        }
        open={isEditModalOpen}
        onCancel={() => {
          editForm.resetFields();
          setIsEditModalOpen(false);
        }}
        footer={null}
        width={1000}
      >
        <Form layout="vertical" form={editForm} onFinish={handleFormSubmit}>
          {renderFormFields(false)}
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
            View Purchase Souda
          </span>
        }
        open={isViewModalOpen}
        onCancel={() => {
          viewForm.resetFields();
          setIsViewModalOpen(false);
        }}
        footer={null}
        width={1000}
      >
        <Form layout="vertical" form={viewForm}>
          {renderFormFields(true)}
        </Form>
      </Modal>
    </div>
  );
}

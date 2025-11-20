import React, { useState, useMemo } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Select,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { Option } = Select;

// Example dropdown options
const companyOptions = [
  { name: "RUCHI SOYA INDUSTRIES LIMITED", groups: ["BLENDED MUSTARD OIL", "SUNFLOWER OIL"] },
  { name: "AMUL DAIRY", groups: ["MILK", "BUTTER"] },
  { name: "PARLE PRODUCTS", groups: ["BISCUITS", "SNACKS"] },
];

const initialData = [
  {
    key: 1,
    itemName: "RUCHI STAR (LITE) M.OIL 15 KG.TIN",
    itemCode:"It1",
    companyName: "RUCHI SOYA INDUSTRIES LIMITED",
    groupName: "BLENDED MUSTARD OIL",
    uom: "TIN",
    hsnCode: "15159010",
    curStock: 50,
    mrp: 2500,
    gst: 5,
    cst: 2,
    etax: 1,
    uUnit: "KG",
    lUnit: "GRAM",
    type: "OIL",
  },
];

export default function ItemMaster() {
  // modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // forms
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [viewForm] = Form.useForm();

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(initialData);

  // derive a flat unique group list (groups are independent of company now)
  const allGroups = useMemo(() => {
    const groups = companyOptions.flatMap((c) => c.groups || []);
    return Array.from(new Set(groups));
  }, []);

  // filter
  const filteredData = data.filter(
    (item) =>
      item.itemName?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.itemCode?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.companyName?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.groupName?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.hsnCode?.toLowerCase().includes(searchText.toLowerCase())
  );

  // Shared form fields renderer (reduces repetition)
  const ItemFormFields = (form, disabled = false) => (
    <Row gutter={16}>
      <Col span={6}>
        <Form.Item
          label="Item Name"
          name="itemName"
          rules={[{ required: true, message: "Enter Item Name" }]}
        >
          <Input placeholder="Enter Item Name" disabled={disabled} />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          label="Item Code"
          name="itemCode"
          rules={[{ required: true, message: "Enter Item Code" }]}
        >
          <Input placeholder="Enter Item Code" disabled={disabled} />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          label="Group Name"
          name="groupName"
          rules={[{ required: true, message: "Select Group Name" }]}
        >
          <Select placeholder="Select Group Name" disabled={disabled}>
            {allGroups.map((group) => (
              <Option key={group} value={group}>
                {group}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[{ required: true, message: "Select Company Name" }]}
        >
          <Select placeholder="Select Company Name" disabled={disabled}>
            {companyOptions.map((company) => (
              <Option key={company.name} value={company.name}>
                {company.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      {/* Remaining fields (kept as in your original form but arranged) */}
      <Col span={6}>
        <Form.Item label="U. Unit" name="uUnit">
          <Select placeholder="Select U. Unit" disabled={disabled}>
            <Option value="KG">KG</Option>
            <Option value="LITRE">Litre</Option>
            <Option value="PCS">Pieces</Option>
          </Select>
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="L. Unit" name="lUnit">
          <Select placeholder="Select L. Unit" disabled={disabled}>
            <Option value="GRAM">Gram</Option>
            <Option value="ML">ML</Option>
            <Option value="NOS">Nos</Option>
          </Select>
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="Type" name="type">
          <Select placeholder="Select Type" disabled={disabled}>
            <Option value="TIN">Oil</Option>
            <Option value="pouch">Food</Option>
            <Option value="Sachet">Spice</Option>
            <Option value="OTHER">Other</Option>
          </Select>
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="HSN CODE" name="hsnCode">
          <Input placeholder="Enter HSN CODE" disabled={disabled} />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="MRP" name="mrp">
          <Input placeholder="Enter MRP" disabled={disabled} />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="ETax %" name="etax">
          <Input placeholder="Enter ETax %" disabled={disabled} />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="CST %" name="cst">
          <Input placeholder="Enter CST %" disabled={disabled} />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="GST %" name="gst">
          <Input placeholder="Enter GST %" disabled={disabled} />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="Cur. Stock" name="curStock">
          <Input placeholder="Enter Current Stock" disabled={disabled} />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="Broker(s) %" name="brokerPercent">
          <Input placeholder="Enter Broker(s) %" disabled={disabled} />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="Broker Amt." name="brokerAmt">
          <Input placeholder="Enter Broker Amount" disabled={disabled} />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="OB" name="ob">
          <Input placeholder="Enter OB" disabled={disabled} />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="Case Qty" name="caseQty">
          <Input placeholder="Enter Case Qty" disabled={disabled} />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="Net Wt." name="netWt">
          <Input placeholder="Enter Net Weight" disabled={disabled} />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item label="Gross Wt." name="grossWt">
          <Input placeholder="Enter Gross Weight" disabled={disabled} />
        </Form.Item>
      </Col>
    </Row>
  );

  // Add handler
  const handleAdd = (values) => {
    setData((prev) => [...prev, { ...values, key: prev.length + 1 }]);
    setIsAddModalOpen(false);
    addForm.resetFields();
  };

  // Edit handler
  const handleEdit = (values) => {
    setData((prev) =>
      prev.map((item) => (item.key === selectedRecord.key ? { ...item, ...values } : item))
    );
    setIsEditModalOpen(false);
    setSelectedRecord(null);
  };

  // Table columns (uses separate handlers)
  const columns = [
    {
      title: <span className="text-amber-700 font-semibold">Item Name</span>,
      dataIndex: "itemName",
      width: 200,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Company Name</span>,
      dataIndex: "companyName",
      width: 200,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Group Name</span>,
      dataIndex: "groupName",
      width: 200,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">HSN Code</span>,
      dataIndex: "hsnCode",
      width: 100,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Quantity</span>,
      dataIndex: "curStock",
      align: "right",
      width: 100,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Price</span>,
      dataIndex: "mrp",
      align: "right",
      width: 100,
      render: (value) => <span className="text-amber-800">₹ {value}</span>,
    },
    {
      title: (
        <span className="text-amber-700 font-semibold">
          All Taxes (%)(gst,cst,eTax)
        </span>
      ),
      align: "right",
      width: 120,
      render: (record) => {
        const gst = parseFloat(record.gst || 0);
        const cst = parseFloat(record.cst || 0);
        const etax = parseFloat(record.etax || 0);
        return <span className="text-amber-800">{(gst + cst + etax).toFixed(2)}</span>;
      },
    },
    {
      title: <span className="text-amber-700 font-semibold">Actions</span>,
      align: "center",
      render: (record) => (
        <div className="flex gap-3 justify-center">
          <EyeOutlined
            className="cursor-pointer text-blue-500"
            onClick={() => {
              setSelectedRecord(record);
              viewForm.setFieldsValue(record);
              setIsViewModalOpen(true);
            }}
          />
          <EditOutlined
            className="cursor-pointer text-red-500"
            onClick={() => {
              setSelectedRecord(record);
              editForm.setFieldsValue(record);
              setIsEditModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* SEARCH BAR + BUTTONS */}
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

      {/* TABLE */}
      <div className="border border-amber-300 rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold text-amber-700 mb-0">
          Item Master Records
        </h2>
        <p className="text-amber-600 mb-3">Manage your item master data</p>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          scroll={{ y: 200 }}
        />
      </div>

      {/* ADD MODAL */}
      <Modal
        title={<span className="text-amber-700 font-semibold">Add New Item</span>}
        open={isAddModalOpen}
        onCancel={() => {
          setIsAddModalOpen(false);
          addForm.resetFields();
        }}
        footer={null}
        width={900}
      >
        <Form
          layout="vertical"
          form={addForm}
          onFinish={handleAdd}
         onValuesChange={(changedValues) => {
  if (changedValues.itemName !== undefined) {
    const itemName = changedValues.itemName;
    addForm.resetFields(); 
    addForm.setFieldsValue({ itemName }); 
  }
}}

        >
          {ItemFormFields(addForm, false)}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => {
                setIsAddModalOpen(false);
                addForm.resetFields();
              }}
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

      {/* EDIT MODAL */}
      <Modal
        title={<span className="text-amber-700 font-semibold">Edit Item</span>}
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setSelectedRecord(null);
        }}
        footer={null}
        width={900}
      >
        <Form
          layout="vertical"
          form={editForm}
          onFinish={handleEdit}
          onValuesChange={(changedValues) => {
  if (changedValues.itemName !== undefined) {
    const itemName = changedValues.itemName;
    editForm.resetFields(); 
    editForm.setFieldsValue({ itemName }); 
  }
}}

        >
          {ItemFormFields(editForm, false)}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedRecord(null);
              }}
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

      {/* VIEW MODAL (read-only) */}
      <Modal
        title={<span className="text-amber-700 font-semibold">View Item</span>}
        open={isViewModalOpen}
        onCancel={() => {
          setIsViewModalOpen(false);
          setSelectedRecord(null);
        }}
        footer={null}
        width={900}
      >
        <Form layout="vertical" form={viewForm}>
          {ItemFormFields(viewForm, true)}
        </Form>
      </Modal>
    </div>
  );
}

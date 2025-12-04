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
  InputNumber,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
  FilterOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;

// Example dropdown options
const companyOptions = [
  { name: "RUCHI SOYA INDUSTRIES LIMITED", groups: ["BLENDED MUSTARD OIL", "SUNFLOWER OIL"] },
  { name: "AMUL DAIRY", groups: ["MILK", "BUTTER"] },
  { name: "PARLE PRODUCTS", groups: ["BISCUITS", "SNACKS"] },
];

const UNIT_OPTIONS = ["LTR", "KG", "PCS", "PACK", "BOX", "ML", "GRAM"];

const initialData = [
  {
    key: 1,
    itemName: "RUCHI STAR (LITE) M.OIL 15 KG.TIN",
    itemCode: "It1",
    groupName: "BLENDED MUSTARD OIL",
    baseUnit: "LTR",
    type: "OIL",
    hsnCode: "15159010",
    minOrderQty: 1,
    pricePer: "LTR",

    curStock: 50,
    mrp: 2500,
    // discount moved to item details
    discountPercent: 2,
    sellingPrice: 2500 * (1 - 2 / 100),

    // suppliers
    suppliers: [
      {
        companyName: "RUCHI SOYA INDUSTRIES LIMITED",
        purchasePrice: 2000,
        etax: 1,
        gst: 5,
        igst: 0,
        supplierSKU: "R-001",
      },
    ],

    // units
    units: [
      { unitName: "PACK", multiplier: 20, convertUnit: "LTR" },
      { unitName: "BOX", multiplier: 300, convertUnit: "LTR" },
    ],
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
  const filteredData = data.filter((item) =>
    item.itemName?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.itemCode?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.groupName?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.hsnCode?.toLowerCase().includes(searchText.toLowerCase())
  );

  // helper to compute selling price
  const computeSellingPrice = (mrp, discountPercent) => {
    const m = parseFloat(mrp) || 0;
    const d = parseFloat(discountPercent) || 0;
    return Number((m * (1 - d / 100)).toFixed(2));
  };

  // Shared form fields renderer (Item Details, Supplier Purchase Source, Units)
  const ItemFormFields = (form, disabled = false) => (
    <div>
      {/* Sub-heading: Item Details */}
      <h3 style={{ marginBottom: 8 }}>Item Details</h3>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Item Name" name="itemName" rules={[{ required: true, message: "Enter Item Name" }] }>
            <Input placeholder="Enter Item Name" disabled={disabled} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Item Code" name="itemCode" rules={[{ required: true, message: "Enter Item Code" }] }>
            <Input placeholder="Enter Item Code" disabled={disabled} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Group Name" name="groupName" rules={[{ required: true, message: "Select Group Name" }] }>
            <Select placeholder="Select Group Name" disabled={disabled}>
              {allGroups.map((group) => (
                <Option key={group} value={group}>{group}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="Base Unit" name="baseUnit" rules={[{ required: true, message: "Select base unit" }]}>
            <Select placeholder="Select base unit" disabled={disabled}>
              {UNIT_OPTIONS.slice(0,3).map(u => <Option key={u} value={u}>{u}</Option>)}
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="Type" name="type">
            <Select placeholder="Select Type" disabled={disabled}>
              <Option value="OIL">Oil</Option>
              <Option value="FOOD">Food</Option>
              <Option value="SPICE">Spice</Option>
              <Option value="OTHER">Other</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="HSN CODE" name="hsnCode">
            <Input placeholder="Enter HSN CODE" disabled={disabled} />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Min Order Qty" name="minOrderQty">
            <InputNumber style={{ width: "100%" }} min={0} placeholder="Min Order" disabled={disabled} />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Price Per" name="pricePer">
            <Select placeholder="Price Per" disabled={disabled}>
              {UNIT_OPTIONS.map(u => <Option key={u} value={u}>{u}</Option>)}
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="MRP" name="mrp">
            <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter MRP" disabled={disabled} />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Discount %" name="discountPercent">
            <InputNumber style={{ width: "100%" }} min={0} max={100} placeholder="Discount %" disabled={disabled} />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Selling Price" name="sellingPrice">
            <InputNumber style={{ width: "100%" }} min={0} placeholder="Selling Price" disabled />
          </Form.Item>
        </Col>

      </Row>

      {/* Sub-heading: Supplier / Purchase Source */}
      <div style={{ marginTop: 12 }}>
        <h3 style={{ marginBottom: 8 }}>Supplier / Purchase Source</h3>
        <p style={{ marginTop: 0, color: "#666" }}>You can add multiple suppliers with their purchase rates and tax/discounts.</p>

        {/* Labels row for supplier fields */}
        <Row gutter={8} style={{ fontWeight: 600, marginBottom: 6 }}>
          <Col span={6}>Supplier</Col>
          <Col span={4}>Rate</Col>
          <Col span={4}>ETax %</Col>
          <Col span={4}>GST %</Col>
          <Col span={4}>IGST %</Col>
          <Col span={2}></Col>
        </Row>

        <Form.List name="suppliers">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Row gutter={8} key={field.key} align="middle" style={{ marginBottom: 6 }}>
                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, "companyName"]}
                      fieldKey={[field.fieldKey, "companyName"]}
                      rules={[{ required: true, message: "Select supplier" }]}
                    >
                      <Select placeholder="Supplier / Company" disabled={disabled}>
                        {companyOptions.map((c) => (
                          <Option key={c.name} value={c.name}>{c.name}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item
                      {...field}
                      name={[field.name, "purchasePrice"]}
                      fieldKey={[field.fieldKey, "purchasePrice"]}
                      rules={[{ required: true, message: "Enter purchase price" }]}
                    >
                      <InputNumber style={{ width: "100%" }} min={0} placeholder="Rate" disabled={disabled} />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item {...field} name={[field.name, "etax"]} fieldKey={[field.fieldKey, "etax"]}>
                      <InputNumber style={{ width: "100%" }} min={0} max={100} placeholder="eTax %" disabled={disabled} />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item {...field} name={[field.name, "gst"]} fieldKey={[field.fieldKey, "gst"]}>
                      <InputNumber style={{ width: "100%" }} min={0} max={100} placeholder="GST %" disabled={disabled} />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item {...field} name={[field.name, "igst"]} fieldKey={[field.fieldKey, "igst"]}>
                      <InputNumber style={{ width: "100%" }} min={0} max={100} placeholder="IGST %" disabled={disabled} />
                    </Form.Item>
                  </Col>

                  <Col span={2}>
                    {!disabled && (
                      <Button type="text" danger icon={<MinusCircleOutlined />} onClick={() => remove(field.name)} />
                    )}
                  </Col>
                </Row>
              ))}

              {!disabled && (
                <Form.Item>
                  <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add({ companyName: undefined, purchasePrice: 0, etax: 0, gst: 0, igst: 0 })}>
                    Add Supplier
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
      </div>

      {/* Sub-heading: Units */}
      <div style={{ marginTop: 12 }}>
        <h3 style={{ marginBottom: 8 }}>Units (define other units relative to Base Unit)</h3>
        <p style={{ marginTop: 0, color: "#666" }}>Example: baseUnit = LTR. If 1 PACK = 20 LTR, set unitName=PACK and multiplier=20.</p>

        {/* Labels row for units */}
        <Row gutter={8} style={{ fontWeight: 600, marginBottom: 6 }}>
          <Col span={10}>Unit Name</Col>
          <Col span={6}>Multiplier (in base units)</Col>
          <Col span={6}>Convert Unit</Col>
          <Col span={2}></Col>
        </Row>

        <Form.List name="units">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Row gutter={8} key={field.key} align="middle" style={{ marginBottom: 6 }}>
                  <Col span={10}>
                    <Form.Item
                      {...field}
                      name={[field.name, "unitName"]}
                      fieldKey={[field.fieldKey, "unitName"]}
                      rules={[{ required: true, message: "Enter unit name" }]}
                    >
                      <Input placeholder="Unit name (e.g. PACK, BOX)" disabled={disabled} />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, "multiplier"]}
                      fieldKey={[field.fieldKey, "multiplier"]}
                      rules={[{ required: true, message: "Enter multiplier" }]}
                    >
                      <InputNumber style={{ width: "100%" }} min={0} placeholder="How many base units in 1 of this unit" disabled={disabled} />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item
                      {...field}
                      name={[field.name, "convertUnit"]}
                      fieldKey={[field.fieldKey, "convertUnit"]}
                      rules={[{ required: true, message: "Select unit to convert to" }]}
                    >
                      <Select placeholder="Convert Unit" disabled={disabled}>
                        {UNIT_OPTIONS.map((u) => (
                          <Option key={u} value={u}>{u}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={2}>
                    {!disabled && (
                      <Button type="text" danger icon={<MinusCircleOutlined />} onClick={() => remove(field.name)} />
                    )}
                  </Col>
                </Row>
              ))}

              {!disabled && (
                <Form.Item>
                  <Button type="dashed" block icon={<PlusOutlined />} onClick={() => add({ unitName: undefined, multiplier: 0, convertUnit: UNIT_OPTIONS[0] })}>
                    Add Unit
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
      </div>
    </div>
  );

  // Add handler
  const handleAdd = (values) => {
    const sellingPrice = computeSellingPrice(values.mrp, values.discountPercent);
    const record = { ...values, key: data.length + 1, sellingPrice };
    setData((prev) => [...prev, record]);
    setIsAddModalOpen(false);
    addForm.resetFields();
  };

  // Edit handler
  const handleEdit = (values) => {
    const sellingPrice = computeSellingPrice(values.mrp, values.discountPercent);
    setData((prev) => prev.map((item) => (item.key === selectedRecord.key ? { ...item, ...values, sellingPrice } : item)));
    setIsEditModalOpen(false);
    setSelectedRecord(null);
  };

  // Table columns
  const columns = [
    {
      title: <span className="text-amber-700 font-semibold">Item Name</span>,
      dataIndex: "itemName",
      width: 200,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Group Name</span>,
      dataIndex: "groupName",
      width: 180,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">HSN Code</span>,
      dataIndex: "hsnCode",
      width: 100,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Qty (base)</span>,
      dataIndex: "curStock",
      align: "right",
      width: 120,
      render: (text, record) => (
        <span className="text-amber-800">{record.baseUnit ? `${text} ${record.baseUnit}` : text}</span>
      ),
    },
    {
      title: <span className="text-amber-700 font-semibold">Suppliers</span>,
      dataIndex: "suppliers",
      width: 240,
      render: (suppliers = []) => (
        <div>
          {suppliers.map((s, i) => (
            <div key={i} style={{ fontSize: 12 }}>
              {s.companyName} - {s.purchasePrice ? `₹${s.purchasePrice}` : "-"} {s.igst ? `(igst ${s.igst}%)` : ""}
            </div>
          ))}
        </div>
      ),
    },
    // {
    //   title: <span className="text-amber-700 font-semibold">Selling</span>,
    //   dataIndex: "sellingPrice",
    //   align: "right",
    //   width: 120,
    //   render: (v) => <span className="text-amber-800">₹ {v}</span>,
    // },
    {
      title: <span className="text-amber-700 font-semibold">Actions</span>,
      align: "center",
      render: (record) => (
        <div className="flex gap-3 justify-center">
          <EyeOutlined
            className="cursor-pointer text-blue-500"
            onClick={() => {
              setSelectedRecord(record);
              // ensure viewForm shows computed sellingPrice
              viewForm.setFieldsValue({ ...record });
              setIsViewModalOpen(true);
            }}
          />
          <EditOutlined
            className="cursor-pointer text-red-500"
            onClick={() => {
              setSelectedRecord(record);
              editForm.setFieldsValue({ ...record });
              setIsEditModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  // handle value changes in add/edit forms to auto-calc selling price
  const handleAddFormValuesChange = (changed, all) => {
    if (changed.mrp !== undefined || changed.discountPercent !== undefined) {
      const sp = computeSellingPrice(all.mrp, all.discountPercent);
      addForm.setFieldsValue({ sellingPrice: sp });
    }
  };

  const handleEditFormValuesChange = (changed, all) => {
    if (changed.mrp !== undefined || changed.discountPercent !== undefined) {
      const sp = computeSellingPrice(all.mrp, all.discountPercent);
      editForm.setFieldsValue({ sellingPrice: sp });
    }
  };

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
          <Button icon={<FilterOutlined />} onClick={() => setSearchText("")} className="border-amber-400 text-amber-700 hover:bg-amber-100">
            Reset
          </Button>
        </div>

        <div className="flex gap-2">
          <Button icon={<DownloadOutlined />} className="border-amber-400 text-amber-700 hover:bg-amber-100">Export</Button>
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
        <h2 className="text-lg font-semibold text-amber-700 mb-0">Item Master Records</h2>
        <p className="text-amber-600 mb-3">Manage your item master data</p>
        <Table columns={columns} dataSource={filteredData} pagination={false} scroll={{ y: 240 }} />
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
        width={1000}
      >
        <Form
          layout="vertical"
          form={addForm}
          onFinish={handleAdd}
          initialValues={{ suppliers: [], units: [], discountPercent: 0 }}
          onValuesChange={handleAddFormValuesChange}
        >
          {ItemFormFields(addForm, false)}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
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

      {/* EDIT MODAL */}
      <Modal
        title={<span className="text-amber-700 font-semibold">Edit Item</span>}
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setSelectedRecord(null);
        }}
        footer={null}
        width={1000}
      >
        <Form layout="vertical" form={editForm} onFinish={handleEdit} initialValues={{ suppliers: [], units: [] }} onValuesChange={handleEditFormValuesChange}>
          {ItemFormFields(editForm, false)}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
            <Button
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedRecord(null);
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
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
        width={1000}
      >
        <Form layout="vertical" form={viewForm} initialValues={{ suppliers: [], units: [] }}>
          {ItemFormFields(viewForm, true)}
        </Form>
      </Modal>
    </div>
  );
}

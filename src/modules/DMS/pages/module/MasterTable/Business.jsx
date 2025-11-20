import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  Select,
  Row,
  Col,
  Card,
  DatePicker,
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
import dayjs from "dayjs";

const { Option } = Select;
const parseDateFields = (record) => {
  const dateFields = ["tinDate", "etDate", "cstDate"];
  const newRecord = { ...record };
  dateFields.forEach((field) => {
    if (newRecord[field]) {
       newRecord[field] = dayjs(newRecord[field], "DD:MM:YYYY").isValid()
        ? dayjs(newRecord[field], "DD:MM:YYYY")
        : null;
    }
  });
  return newRecord;
};

const businessDataJSON = [
  {
    key: 1,
    partnerType: "Customer",
    name: "ABC Enterprises",
    branchName: "Mumbai",
    brokerName: "Ravi Traders",
    email: "abc@example.com",
    address: "123 Market Street, Mumbai",
    phoneNo: "9876543210",
    contactPerson: "Rajesh Kumar",
    status: "Active",
    licenseNo: "5567",
       country: "India",
    state: "Maharashtra",
    district: "Mumbai",
    city: "Mumbai",
    pinCode: "400001",
    location: "Market Street",
    type: "Customer",
    mobileNo: "9876543210",
    creditFacility: "Credit Limit",
    securityForCreditFacility: "Bank Guarantee",
  },
  {
    key: 2,
    partnerType: "Vendor",
    shortName: "RSI",
    name: "RUCHI SOYA INDUSTRIES LIMITED",
    address:
      "201, MAHAKOSH HOUSE, 7/5, SOUTH TUKOGANJ, NATH MANDIR ROAD, INDORE-452001",
    phoneNo: "0731-4056012,2513281,82/83,4071109",
    faxNo: "4056019",
    tinNo: "4056019",
    tinDate: "10:01:2025", 
    panNo: "4056019",
    gstIn: "4056019",
    etno: "4056019",
    etDate: "10:01:2025", 
    cstNo: "4056019",
    cstDate: "10:01:2025", 
    tradeNo: "4056019",
    websiteUrl: "http://localhost:3000/login",
    email: "manoj_padtar@gmail.com",
    transactionType: "Super Stockist",
    tranStatus: "Inside",
    igstApplicable: "No",
    state: "Madhya Pradesh",
    location: "Indore",
    status: "Active",
    district: "Indore",
    city: "Indore",
    pinCode: "452001",
    plants: [
      {
        plantName: "Indore Plant",
        address: "7/5, South Tukoganj, Indore",
        phoneNo: "1234567890",
        email: "indoreplant@ruchi.com",
        state: "Madhya Pradesh",
        faxNo: "1234",
        district: "Indore",
        city: "Indore",
        pin: "452001",
      },
    ],
  },
].map((record) => parseDateFields(record));

export default function Business() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [activeForm, setActiveForm] = useState("Customer"); 

  const [form] = Form.useForm();
  const [viewForm] = Form.useForm();
  const [data, setData] = useState(businessDataJSON);

  useEffect(() => {
    if (isEditModalOpen && selectedRecord) {
        const recordWithParsedDates = parseDateFields(selectedRecord);
      form.setFieldsValue(recordWithParsedDates);
    } else if (isViewModalOpen && selectedRecord) {
          const recordWithParsedDates = parseDateFields(selectedRecord);
      viewForm.setFieldsValue(recordWithParsedDates);
    } else if (isEditModalOpen && !selectedRecord) {
      form.resetFields();
    }
  }, [isEditModalOpen, isViewModalOpen, selectedRecord, activeForm, form, viewForm]);

  // ================= Table Columns =================
  const columns = [
    {
      title: <span className="text-amber-700 font-semibold">Partner Type</span>,
      dataIndex: "partnerType",
      width: 120,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Name</span>,
      dataIndex: "name",
      width: 150,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Email</span>,
      dataIndex: "email",
      width: 200,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Address</span>,
      dataIndex: "address",
      width: 200,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Contact No</span>,
      dataIndex: "phoneNo",
      width: 150,
      render: (text) => <span className="text-amber-800">{text}</span>,
    },
    {
      title: <span className="text-amber-700 font-semibold">Status</span>,
      dataIndex: "status",
      render: (status) => {
        const base = "px-3 py-1 rounded-full text-sm font-semibold";
        if (status === "Active")
          return (
            <span className={`${base} bg-green-100 text-green-700`}>
              {status}
            </span>
          );
        if (status === "Inactive")
          return (
            <span className={`${base} bg-red-100 text-red-700`}>
              {status}
            </span>
          );
        return (
          <span className={`${base} bg-yellow-100 text-yellow-700`}>
            {status}
          </span>
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
              setActiveForm(record.partnerType);
               setIsViewModalOpen(true);
            }}
          />
          <EditOutlined
            className="cursor-pointer text-red-500"
            onClick={() => {
              setSelectedRecord(record);
              setActiveForm(record.partnerType);
                setIsEditModalOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  // ================= Handle Save =================
  const handleSave = (values) => {
     const formattedValues = { ...values };
    const dateFields = ["tinDate", "etDate", "cstDate"];
    dateFields.forEach((field) => {
      if (formattedValues[field] && dayjs.isDayjs(formattedValues[field])) {
        formattedValues[field] = formattedValues[field].format("DD:MM:YYYY");
      }
    });

    const finalValues = {
      ...formattedValues,
      partnerType: activeForm,
       name: values.name || values.compName || "N/A",
    };

    if (selectedRecord) {
      // Edit logic
      setData((prev) =>
        prev.map((item) =>
          item.key === selectedRecord.key
            ? { ...item, ...finalValues }     : item
        )
      );
    } else {
      // Add logic
      setData((prev) => [
        ...prev,
        { key: prev.length + 1, ...finalValues },
      ]);
    }

    setIsEditModalOpen(false);
  };

  const filteredData = data.filter(
    (item) =>
      item.partnerType === activeForm &&
      (item.name || item.compName)?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchText.toLowerCase())
  );

  // ================= Customer Form =================
  const renderCustomerForm = (disabled = false) => (
    <>
      <h3 className="text-lg font-semibold text-amber-700 mb-2">
        Customer Details
      </h3>

      <Row gutter={24}>
        <Col span={4}>
          <Form.Item
            label="Customer Name"
            name="name"
            rules={[{ required: true, message: "Please enter customer name" }]}
          >
            <Input disabled={disabled} placeholder="Enter Customer Name" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Branch Name" name="branchName">
            <Input disabled={disabled} placeholder="Enter Branch Name" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Broker Name" name="brokerName">
            <Input disabled={disabled} placeholder="Enter Broker Name" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Phone No" name="phoneNo">
            <Input disabled={disabled} placeholder="Enter Phone Number" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Address" name="address">
            <Input.TextArea
              rows={1}
              disabled={disabled}
              placeholder="Enter Address"
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Country" name="country">
            <Input disabled={disabled} placeholder="Enter Country" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="State" name="state">
            <Input disabled={disabled} placeholder="Enter State" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="District" name="district">
            <Input disabled={disabled} placeholder="Enter District" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="City" name="city">
            <Input disabled={disabled} placeholder="Enter City" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Pin Code" name="pinCode">
            <Input disabled={disabled} placeholder="Enter Pin Code" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Location" name="location">
            <Input disabled={disabled} placeholder="Enter Location" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Type" name="type">
            <Select disabled={disabled} placeholder="Select Type">
              <Option value="Customer">Customer</Option>
              <Option value="Supplier">Supplier</Option>
              <Option value="Both">Both</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Status" name="status">
            <Select disabled={disabled} placeholder="Select Status">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Contact Person" name="contactPerson">
            <Input disabled={disabled} placeholder="Enter Contact Person" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Mobile No" name="mobileNo">
            <Input disabled={disabled} placeholder="Enter Mobile Number" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Email" name="email">
            <Input disabled={disabled} placeholder="Enter Email" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Credit Facility" name="creditFacility">
            <Select disabled={disabled} placeholder="Select Credit Facility">
              <Option value="Advance">Advance</Option>
              <Option value="Cheque">Cheque</Option>
              <Option value="Online">Online</Option>
              <Option value="Credit Limit">Credit Limit</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Security for Credit Facility"
            name="securityForCreditFacility"
          >
            <Select disabled={disabled} placeholder="Select Security Type">
              <Option value="Bank Guarantee">Bank Guarantee</Option>
              <Option value="Post Dated Cheque">Post Dated Cheque</Option>
              <Option value="Fixed Deposit">Fixed Deposit</Option>
              <Option value="Collateral">Collateral</Option>
              <Option value="None">None</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* ===== Section 2: Credit Facility Information ===== */}
      <h3 className="text-lg font-semibold text-amber-700 mb-2">
        Credit Facility Information
      </h3>

      <Row gutter={24}>
        <Col span={4}>
          <Form.Item label="Advance Cheque" name="advCheque">
            <Input disabled={disabled} placeholder="Enter Cheque Number" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Amount Limit" name="amountLimit">
            <Input disabled={disabled} placeholder="Enter Amount Limit" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="No. of Days Limit" name="noDaysLimit">
            <Input disabled={disabled} placeholder="Enter Days Limit" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="No. of Invoice Limit" name="noInvoiceLimit">
            <Input disabled={disabled} placeholder="Enter Invoice Limit" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Souda Limit (In Ton)" name="soudaLimit">
            <Input disabled={disabled} placeholder="Enter Souda Limit" />
          </Form.Item>
        </Col>
      </Row>

      {/* ===== Section 3: Legal & Tax Information ===== */}
      <h3 className="text-lg font-semibold text-amber-700 mb-2">
        Legal & Tax Information
      </h3>

      <Row gutter={24}>
        <Col span={4}>
          <Form.Item label="GST No" name="gstNo">
            <Input disabled={disabled} placeholder="Enter GST No" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="TIN No" name="tinNo">
            <Input disabled={disabled} placeholder="Enter TIN No" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="FSSAI No" name="fssaiNo">
            <Input disabled={disabled} placeholder="Enter FSSAI No" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="License No" name="licenseNo">
            <Input disabled={disabled} placeholder="Enter License No" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="PAN No" name="panNo">
            <Input disabled={disabled} placeholder="Enter PAN No" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Aadhar No" name="aadharNo">
            <Input disabled={disabled} placeholder="Enter Aadhar No" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="TDS Applicable" name="tdsApplicable">
            <Select disabled={disabled} placeholder="Select TDS Option">
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Billing Type" name="billingType">
            <Select disabled={disabled} placeholder="Select Billing Type">
              <Option value="Regular">Regular</Option>
              <Option value="Provisional">Provisional</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  // ================= Vendor Form =================
  const renderVendorForm = (disabled = false) => (
    <>
      <h3 className="text-lg font-semibold text-amber-700 mb-2">
        Vendor Details
      </h3>
      <Row gutter={24}>
        <Col span={4}>
          <Form.Item
            label="Short Name"
            name="shortName"
            rules={[{ required: true, message: "Please enter short name" }]}
          >
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="Company Name"
            name="name"
            rules={[{ required: true, message: "Please enter company name" }]}
          >
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Address" name="address">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Phone No" name="phoneNo">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Fax No" name="faxNo">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Tin No" name="tinNo">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Tin Date" name="tinDate">
            <DatePicker
              className="w-full"
              disabled={disabled}
              format="DD:MM:YYYY" />{" "}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="PAN No" name="panNo">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="GSTIN" name="gstIn">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="ET No" name="etno">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="ET Date" name="etDate">
            <DatePicker
              className="w-full"
              disabled={disabled}
              format="DD:MM:YYYY"     />{" "}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="CST No" name="cstNo">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="CST Date" name="cstDate">
            <DatePicker
              className="w-full"
              disabled={disabled}
              format="DD:MM:YYYY"  />{" "}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Trade No" name="tradeNo">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Website / URL (if any)" name="websiteUrl">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Email" name="email">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Transaction Type" name="transactionType">
            <Select disabled={disabled} className="border-amber-400">
              <Select.Option value="Super Stockist">Super Stockist</Select.Option>
              <Select.Option value="Distributor">Distributor</Select.Option>
              <Select.Option value="Retailer">Retailer</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Transaction Status" name="tranStatus">
            <Select disabled={disabled} className="border-amber-400">
              <Select.Option value="Inside">Inside</Select.Option>
              <Select.Option value="Outside">Outside</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="IGST Applicable" name="igstApplicable">
            <Select disabled={disabled} className="border-amber-400">
              <Select.Option value="Yes">Yes</Select.Option>
              <Select.Option value="No">No</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="State" name="state">
            <Input disabled={disabled} placeholder="Enter State" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="District" name="district">
            <Input disabled={disabled} placeholder="Enter District" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="City" name="city">
            <Input disabled={disabled} placeholder="Enter City" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Pin Code" name="pinCode">
            <Input disabled={disabled} placeholder="Enter Pin Code" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Location" name="location">
            <Input disabled={disabled} className="border-amber-400" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Status" name="status">
            <Select disabled={disabled} className="border-amber-400">
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* ===== Plant Details (Dynamic List) ===== */}
      <h3 className="text-lg font-semibold text-amber-700 mt-4 mb-2">
        Plant Details
      </h3>
      <div className="max-h-60 overflow-y-auto pr-4">
        <Form.List name="plants">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Card
                  key={key}
                  title={
                    <span className="text-amber-700">Plant {index + 1}</span>
                  }
                  extra={
                    !disabled && (
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        className="text-red-500 hover:text-red-700"
                      />
                    )
                  }
                  style={{ marginBottom: 16, border: "1px solid #ffc877" }}
                >
                  <Row gutter={24}>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "plantName"]}
                        fieldKey={[fieldKey, "plantName"]}
                        label="Plant Name"
                        rules={[
                          { required: true, message: "Missing Plant Name" },
                        ]}
                      >
                        <Input disabled={disabled} placeholder="Enter Plant Name" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "address"]}
                        fieldKey={[fieldKey, "address"]}
                        label="Address"
                      >
                        <Input disabled={disabled} placeholder="Enter Plant Address" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "phoneNo"]}
                        fieldKey={[fieldKey, "phoneNo"]}
                        label="Phone No"
                      >
                        <Input disabled={disabled} placeholder="Enter Phone Number" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "email"]}
                        fieldKey={[fieldKey, "email"]}
                        label="Email"
                      >
                        <Input disabled={disabled} placeholder="Enter Email" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "state"]}
                        fieldKey={[fieldKey, "state"]}
                        label="State"
                      >
                        <Input disabled={disabled} placeholder="Enter State" />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "district"]}
                        fieldKey={[fieldKey, "district"]}
                        label="District"
                      >
                        <Input disabled={disabled} placeholder="Enter District" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "city"]}
                        fieldKey={[fieldKey, "city"]}
                        label="City"
                      >
                        <Input disabled={disabled} placeholder="Enter City" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "pin"]}
                        fieldKey={[fieldKey, "pin"]}
                        label="Pin"
                      >
                        <Input disabled={disabled} placeholder="Enter Pin" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "faxNo"]}
                        fieldKey={[fieldKey, "faxNo"]}
                        label="Fax No"
                      >
                        <Input disabled={disabled} placeholder="Enter Fax No" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              ))}

              {!disabled && (
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    className="border-amber-400 text-amber-700 hover:bg-amber-100"
                  >
                    Add Plant
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
      </div>
    </>
  );

  // ================= Component Render =================
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2">
          <Input
            prefix={<SearchOutlined className="text-amber-600" />}
            placeholder="Search by Name or Email..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-64 border-amber-300"
          />
          <Button
            icon={<FilterOutlined />}
            onClick={() => setSearchText("")}
            className="border-amber-400 text-amber-700 hover:bg-amber-100"
          >
            Reset Search
          </Button>
          <Select
            value={activeForm}
            onChange={(value) => setActiveForm(value)}
            className="w-40 border-amber-300"
          >
            <Option value="Customer">Customer</Option>
            <Option value="Vendor">Vendor</Option>
          </Select>
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
            onClick={() => {
              setSelectedRecord(null); 
              setActiveForm("Customer"); 
              form.resetFields(); 
              setIsEditModalOpen(true);
            }}
            className="bg-amber-500 hover:bg-amber-600 border-none "
          >
            Add Partner
          </Button>
        </div>
      </div>

      <div className="border border-amber-300 rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold text-amber-700 mb-0">
          Business Partner Master Records
        </h2>
        <p className="text-amber-600 mb-3">
          Showing {activeForm} records. Manage all Customer & Vendor data in one place
        </p>
        <Table
          columns={columns}
          dataSource={filteredData.filter(
            (item) => item.partnerType === activeForm
          )} 
          pagination={false}
          scroll={{ y: 350 }}
          className="custom-scroll-table"
        />
      </div>

      <Modal
        title={
          <span className="text-amber-700 font-semibold">
            {isViewModalOpen ? "View" : selectedRecord ? "Edit" : "Add"}{" "}
            {activeForm}
          </span>
        }
        open={isEditModalOpen || isViewModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setIsViewModalOpen(false);
          setSelectedRecord(null); 
          form.resetFields(); 
          viewForm.resetFields(); 
        }}
        footer={null}
        width={1200}
        style={{ top: 20 }}
      >
        {!selectedRecord && !isViewModalOpen && (
          <div className="flex gap-2 mb-4">
            <Button
              type={activeForm === "Customer" ? "primary" : "default"}
              onClick={() => {
                setActiveForm("Customer");
                form.resetFields();
              }}
              className={`border border-amber-400 ${
                activeForm === "Customer"
                  ? "bg-amber-500 text-amber-900 hover:bg-amber-600"
                  : "text-amber-700 bg-white hover:bg-amber-100"
              }`}
            >
              Customer
            </Button>
            <Button
              type={activeForm === "Vendor" ? "primary" : "default"}
              onClick={() => {
                setActiveForm("Vendor");
                form.resetFields();
              }}
              className={`border border-amber-400 ${
                activeForm === "Vendor"
                  ? "bg-amber-500 text-amber-900 hover:bg-amber-600"
                  : "text-amber-700 bg-white hover:bg-amber-100"
              }`}
            >
              Vendor
            </Button>
          </div>
        )}

        <Form
          layout="vertical"
          form={isViewModalOpen ? viewForm : form}
          onFinish={handleSave}
          className="max-h-[70vh] overflow-y-auto pr-4 custom-scroll-form"
        >
          {activeForm === "Customer"
            ? renderCustomerForm(isViewModalOpen)
            : renderVendorForm(isViewModalOpen)}

          {!isViewModalOpen && (
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
                className="bg-amber-500 hover:bg-amber-600 border-none text-amber-900"
              >
                {selectedRecord ? "Update" : "Add"}
              </Button>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
}
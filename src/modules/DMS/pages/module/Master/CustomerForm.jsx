// forms/CustomerForm.jsx
import React from "react";
import { Row, Col, Form, Input, Select } from "antd";

const { Option } = Select;

export default function CustomerForm({ disabled = false }) {
  return (
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
          <Form.Item label="Business Name" name="branchName">
            <Input disabled={disabled} placeholder="Enter Business Name" />
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

      {/* ===== Credit Facility Information ===== */}
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

      {/* ===== Legal & Tax Information ===== */}
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
}

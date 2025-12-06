// ./forms/BrokerForm.jsx
import React from "react";
import { Row, Col, Form, Input, DatePicker, Select } from "antd";

const { Option } = Select;

export default function BrokerForm({ disabled = false }) {
  return (
    <>
      <h3 className="text-lg font-semibold text-amber-700 mb-2">
        Broker Details
      </h3>

      {/* Details */}
      <Row gutter={24}>
        <Col span={4}>
          <Form.Item
            label="Broker Name"
            name="brokerName"
            rules={[{ required: true, message: "Please enter broker name" }]}
          >
            <Input disabled={disabled} placeholder="Enter Broker Name" />
          </Form.Item>
        </Col>

        {/* <Col span={4}>
          <Form.Item label="Broker ID" name="brokerId">
            <Input disabled={disabled} placeholder="Enter Broker ID" />
          </Form.Item>
        </Col> */}

        <Col span={4}>
          <Form.Item label="Address Line 1" name="address1">
            <Input disabled={disabled} placeholder="Enter Address Line 1" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Address Line 2" name="address2">
            <Input disabled={disabled} placeholder="Enter Address Line 2" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Phone Number" name="phoneNo">
            <Input disabled={disabled} placeholder="Enter Phone Number" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Telephone Number" name="telephoneNo">
            <Input disabled={disabled} placeholder="Enter Telephone Number" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Fax Number" name="faxNo">
            <Input disabled={disabled} placeholder="Enter Fax No" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="PAN" name="pan">
            <Input disabled={disabled} placeholder="Enter PAN" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Email Address" name="email">
            <Input disabled={disabled} placeholder="Enter Email" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="GSTIN" name="gstin">
            <Input disabled={disabled} placeholder="Enter GSTIN" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="State" name="state">
            <Input disabled={disabled} placeholder="Enter State" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Location" name="location">
            <Input disabled={disabled} placeholder="Enter Location" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="PIN" name="pin">
            <Input disabled={disabled} placeholder="Enter PIN" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            label="Commission Setup Date"
            name="brokerCommissionSetupDate"
          >
            <DatePicker
              className="w-full"
              disabled={disabled}
              format="DD:MM:YYYY"
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Commission Setup */}
      <h3 className="text-lg font-semibold text-amber-700 mb-2 mt-4">
        Commission Setup
      </h3>
      <Row gutter={24}>
        <Col span={4}>
          <Form.Item label="Vendor Name" name="vendorName">
            <Input disabled={disabled} placeholder="Enter Vendor Name" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Product Name" name="productName">
            <Input disabled={disabled} placeholder="Enter Product Name" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Commission Type" name="commissionType">
            <Select disabled={disabled} placeholder="Select Type">
              <Option value="basic">Basic</Option>
              <Option value="scheme">Scheme</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Commission Method" name="commissionMethod">
            <Select disabled={disabled} placeholder="Select Method">
              <Option value="per_unit">Per Unit</Option>
              <Option value="percentage">Percentage</Option>
              <Option value="fixed">Fixed Amount</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Commission Unit" name="commissionUnit">
            <Input disabled={disabled} placeholder="e.g. ₹ / MT" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Commission Amount" name="commissionAmount">
            <Input disabled={disabled} placeholder="Enter Amount" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="On Sale" name="onSale">
            <Select disabled={disabled}>
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="On Purchase" name="onPurchase">
            <Select disabled={disabled}>
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
    
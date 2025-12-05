// forms/TransportForm.jsx
import React from "react";
import { Row, Col, Form, Input } from "antd";

export default function TransportForm({ disabled = false }) {
  return (
    <>
      <h3 className="text-lg font-semibold text-amber-700 mb-2">
        Transport Details
      </h3>

      <Row gutter={24}>
        <Col span={4}>
          <Form.Item
            label="Registered Name"
            name="transportName"
            rules={[{ required: true, message: "Please enter registered name" }]}
          >
            <Input disabled={disabled} placeholder="Enter Registered Name" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Transport ID" name="transportId">
            <Input disabled={disabled} placeholder="Enter Transport ID" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="User ID" name="userId">
            <Input disabled={disabled} placeholder="Enter User ID" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Password" name="password">
            <Input.Password
              disabled={disabled}
              placeholder="Enter Password"
            />
          </Form.Item>
        </Col>

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
          <Form.Item label="Fax No" name="faxNo">
            <Input disabled={disabled} placeholder="Enter Fax No" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Email ID" name="email">
            <Input disabled={disabled} placeholder="Enter Email ID" />
          </Form.Item>
        </Col>
      </Row>

      <h3 className="text-lg font-semibold text-amber-700 mb-2 mt-4">
        Business Details
      </h3>

      <Row gutter={24}>
        <Col span={4}>
          <Form.Item label="Contact Person Name" name="contactPerson">
            <Input disabled={disabled} placeholder="Enter Contact Person" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="PAN" name="pan">
            <Input disabled={disabled} placeholder="Enter PAN" />
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
          <Form.Item label="City" name="city">
            <Input disabled={disabled} placeholder="Enter City" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="District" name="district">
            <Input disabled={disabled} placeholder="Enter District" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="PIN" name="pin">
            <Input disabled={disabled} placeholder="Enter PIN" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

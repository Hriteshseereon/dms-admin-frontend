import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  Select,
  Row,
  Col,
  Space,
  Tag,
  DatePicker,
  message,
} from "antd";
import {
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

// ---------------------------
// Mock data for Sales Dispute
// ---------------------------
const salesDisputeJSON = {
  records: [
    {
      key: 1,
      invoiceNo: "INV-1001",
      orderId: "ORD-9001",
      plantName: "Cuttack Plant",
      customer: "Ramesh Kumar",
      returnDate: "2025-11-20",
      item: "Sunflower Oil",
      itemCode: "IT-SF-01",
      uom: "Ltr",
      rate: 480,
      orderQty: 100,
      returnQty: 10,
      returnReason: "Damaged Packaging",
      status: "Pending",
      createdAt: "2025-11-21T10:23:00Z",
    },
    {
      key: 2,
      invoiceNo: "INV-1002",
      orderId: "ORD-9002",
      plantName: "Bhubaneswar Plant",
      customer: "Suresh Rao",
      returnDate: "2025-11-22",
      item: "Soya",
      itemCode: "IT-SO-02",
      uom: "Kg",
      rate: 320,
      orderQty: 200,
      returnQty: 5,
      returnReason: "Quality Issue",
      status: "Approved",
      createdAt: "2025-11-22T13:02:00Z",
    },
  ],
  options: {
    statusOptions: ["Pending", "Approved", "Rejected"],
    reasonOptions: ["Quality Issue", "Damaged Packaging", "Wrong Item", "Expired"],
  },
};

export default function SalesDispute() {
  const [records, setRecords] = useState(salesDisputeJSON.records);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm] = Form.useForm();

  // derived filtered data
  const filteredData = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return records.filter((r) => {
      if (statusFilter && r.status !== statusFilter) return false;
      if (!q) return true;
      return (
        String(r.invoiceNo).toLowerCase().includes(q) ||
        String(r.orderId).toLowerCase().includes(q) ||
        String(r.customer).toLowerCase().includes(q) ||
        String(r.item).toLowerCase().includes(q)
      );
    });
  }, [records, searchText, statusFilter]);

  useEffect(() => {
    if (!isEditOpen) editForm.resetFields();
  }, [isEditOpen, editForm]);

  const statusColor = (s) => {
    if (s === "Approved") return "green";
    if (s === "Pending") return "gold";
    return "red";
  };

  const openView = (rec) => {
    setSelected(rec);
    setIsViewOpen(true);
  };

  const openEdit = (rec) => {
    setSelected(rec);
    editForm.setFieldsValue({
      ...rec,
      returnDate: rec.returnDate ? dayjs(rec.returnDate) : null,
    });
    setIsEditOpen(true);
  };

  const saveEdit = async () => {
    try {
      const vals = await editForm.validateFields();
      const payload = {
        ...selected,
        ...vals,
        returnDate: vals.returnDate ? vals.returnDate.format("YYYY-MM-DD") : null,
      };
      setRecords((prev) => prev.map((r) => (r.key === selected.key ? payload : r)));
      setIsEditOpen(false);
      message.success("Dispute updated");
    } catch (e) {}
  };

  const changeStatusInline = (key, newStatus) => {
    setRecords((prev) => prev.map((r) => (r.key === key ? { ...r, status: newStatus } : r)));
    message.success("Status changed");
  };

  const exportCSV = () => {
    const headers = [
      "InvoiceNo",
      "OrderId",
      "Plant",
      "Customer",
      "Item",
      "ItemCode",
      "UOM",
      "OrderQty",
      "ReturnQty",
      "Rate",
      "ReturnDate",
      "Reason",
      "Status",
    ];
    const rows = records.map((r) => [
      r.invoiceNo,
      r.orderId,
      r.plantName,
      r.customer,
      r.item,
      r.itemCode,
      r.uom,
      r.orderQty,
      r.returnQty,
      r.rate,
      r.returnDate,
      r.returnReason,
      r.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sales_disputes_${dayjs().format("YYYYMMDD_HHmm")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    message.success("CSV exported");
  };

  const columns = [
    // { title: "Invoice", dataIndex: "invoiceNo", key: "invoiceNo", width: 120 },
    // { title: "Order ID", dataIndex: "orderId", key: "orderId", width: 120 },
    // { title: "Plant", dataIndex: "plantName", key: "plantName", width: 160 },
    { title: "Customer", dataIndex: "customer", key: "customer", width: 180 },
    { title: "Item", dataIndex: "item", key: "item", width: 160 },
    {
      title: "Qty (Order/Return)",
      key: "qty",
      width: 140,
      render: (_, r) => `${r.orderQty || 0} / ${r.returnQty || 0} ${r.uom || ""}`,
    },
    // { title: "Rate", dataIndex: "rate", key: "rate", width: 100 },
    // { title: "Return Date", dataIndex: "returnDate", key: "returnDate", width: 120 },
    { title: "Reason", dataIndex: "returnReason", key: "returnReason", width: 180, ellipsis: true },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 160,
    //   render: (s, rec) => (
    //     <Space>
    //       <Tag color={statusColor(s)}>{s}</Tag>
    //       <Select
    //         size="small"
    //         value={s}
    //         onChange={(val) => changeStatusInline(rec.key, val)}
    //         style={{ width: 110 }}
    //       >
    //         {salesDisputeJSON.options.statusOptions.map((opt) => (
    //           <Select.Option key={opt} value={opt}>
    //             {opt}
    //           </Select.Option>
    //         ))}
    //       </Select>
    //     </Space>
    //   ),
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, rec) => (
        <Space>
          <EyeOutlined className="cursor-pointer text-blue-600" onClick={() => openView(rec)} />
          <EditOutlined className="cursor-pointer text-amber-600" onClick={() => openEdit(rec)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Space>
          <Input
            placeholder="Search invoice / order / customer / item"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 360 }}
            allowClear
          />

          <Select
            placeholder="Filter by status"
            allowClear
            value={statusFilter}
            onChange={(v) => setStatusFilter(v)}
            style={{ width: 160 }}
          >
            {salesDisputeJSON.options.statusOptions.map((s) => (
              <Select.Option key={s} value={s}>
                {s}
              </Select.Option>
            ))}
          </Select>

          <Button icon={<DownloadOutlined />} onClick={exportCSV}>
            Export
          </Button>
        </Space>

        <div />
      </div>

      <div className="border rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-amber-700 mb-1">Sales Disputes - Admin</h2>
        <p className="text-sm text-amber-600 mb-4">View disputes raised by customers and manage status.</p>
        <Table columns={columns} dataSource={filteredData} rowKey={(r) => r.key} pagination={{ pageSize: 8 }} bordered />
      </div>

      {/* View Modal */}
      <Modal title={`View Dispute: ${selected?.invoiceNo || ""}`} open={isViewOpen} onCancel={() => setIsViewOpen(false)} footer={null} width={900}>
        {selected && (
          <div className="space-y-4">
            <Row gutter={12}>
              <Col span={12}>
                <div className="font-semibold">Invoice / Order</div>
                <div>{selected.invoiceNo} / {selected.orderId}</div>
              </Col>
              <Col span={12}>
                <div className="font-semibold">Customer / Plant</div>
                <div>{selected.customer} / {selected.plantName}</div>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={8}>
                <div className="font-semibold">Item</div>
                <div>{selected.item} ({selected.itemCode})</div>
              </Col>
              <Col span={8}>
                <div className="font-semibold">Qty (Order / Return)</div>
                <div>{selected.orderQty} / {selected.returnQty} {selected.uom}</div>
              </Col>
              <Col span={8}>
                <div className="font-semibold">Rate</div>
                <div>{selected.rate}</div>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={24}>
                <div className="font-semibold">Reason</div>
                <div>{selected.returnReason}</div>
              </Col>
            </Row>

            <Row gutter={12}>
              <Col span={6}>
                <div className="font-semibold">Return Date</div>
                <div>{selected.returnDate}</div>
              </Col>
              <Col span={6}>
                <div className="font-semibold">Status</div>
                <Tag color={statusColor(selected.status)}>{selected.status}</Tag>
              </Col>
              <Col span={12}>
                <div className="font-semibold">Raised At</div>
                <div>{selected.createdAt}</div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal title={`Edit Dispute: ${selected?.invoiceNo || ""}`} open={isEditOpen} onCancel={() => setIsEditOpen(false)} onOk={saveEdit} width={900}>
        <Form form={editForm} layout="vertical">
          <Row gutter={12}>
            <Col span={8}>
              <Form.Item label="Invoice No" name="invoiceNo">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Order ID" name="orderId">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Plant" name="plantName">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={8}>
              <Form.Item label="Item / Code" name="item">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Order Qty" name="orderQty">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Return Qty" name="returnQty">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="UOM" name="uom">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={8}>
              <Form.Item label="Return Date" name="returnDate">
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Status" name="status" rules={[{ required: true }]}>
                <Select>
                  {salesDisputeJSON.options.statusOptions.map((s) => (
                    <Select.Option key={s} value={s}>
                      {s}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Admin Note" name="adminNote">
                <Input.TextArea rows={2} placeholder="Optional admin note" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

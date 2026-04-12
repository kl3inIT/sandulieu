---
status: complete
phase: 04-member-management-bulk-operations
source:
  - 04-01-SUMMARY.md
  - 04-02-SUMMARY.md
  - 04-03-SUMMARY.md
  - 04-04-SUMMARY.md
  - 04-05-SUMMARY.md
started: 2026-04-12T00:00:00Z
updated: 2026-04-12T00:00:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Trang danh sách thành viên tải và hiển thị bảng

expected: |
Truy cập trang danh sách thành viên của một phòng ban (ví dụ /admin/organizations/.../departments/.../members).
Trang hiển thị tiêu đề "Danh sách thành viên", nút "Thêm thành viên" ở góc phải.
Bảng có các cột: checkbox, #, Mã thành viên, Họ và tên, Trạng thái, Thao tác.
Mỗi hàng hiển thị badge trạng thái và 3 icon action (Eye, Pencil, Trash).
result: pass

### 2. Tìm kiếm và lọc cập nhật URL

expected: |
Nhập text vào ô tìm kiếm "Tìm theo mã hoặc họ tên..." — bảng lọc theo text đó.
Chọn một trạng thái trong dropdown "Tất cả trạng thái" — bảng lọc theo trạng thái.
Kiểm tra thanh URL: các tham số search, statuses xuất hiện trong query string.
Khi reload trang với URL đó, bộ lọc vẫn được áp dụng đúng.
result: pass

### 3. Sắp xếp cột

expected: |
Click vào tiêu đề cột "Mã thành viên" — icon mũi tên xuất hiện và danh sách sắp xếp theo mã.
Click lại — thứ tự đảo ngược.
URL cũng cập nhật tham số sort tương ứng.
result: pass

### 4. Tạo thành viên mới

expected: |
Click nút "Thêm thành viên" → chuyển đến trang tạo mới.
Form hiển thị "Tổ chức" và "Phòng ban" dưới dạng text chỉ đọc (không phải input), lấy từ URL.
Điền Mã thành viên, Họ và tên, chọn Trạng thái → click "Lưu thành viên".
Sau khi lưu thành công, trang chuyển về danh sách và thành viên mới xuất hiện trong bảng.
result: pass

### 5. Chỉnh sửa thành viên

expected: |
Click icon Pencil trên một hàng → chuyển đến trang chỉnh sửa.
Form được pre-populate với dữ liệu hiện tại của thành viên đó.
"Tổ chức" và "Phòng ban" hiển thị tên đầy đủ (không phải ID) ở dạng chỉ đọc.
Sửa Họ và tên → click "Lưu thay đổi" → trang chuyển về trang chi tiết, dữ liệu mới được hiển thị.
result: pass

### 6. Trang chi tiết thành viên hiển thị đầy đủ phân cấp

expected: |
Click icon Eye trên một hàng → chuyển đến trang chi tiết.
Trang hiển thị 6 trường: ID ổn định, Mã thành viên, Họ và tên, Trạng thái (badge), Tổ chức cha, Phòng ban cha.
"Tổ chức cha" và "Phòng ban cha" hiển thị tên thật (ví dụ "Acme Corporation"), không phải ID kỹ thuật.
Có 3 nút hành động: "Quay lại danh sách", "Chỉnh sửa", "Xoá".
result: pass

### 7. Xoá thành viên qua dialog xác nhận

expected: |
Click icon Trash trên một hàng trong danh sách → dialog "Xoá thành viên" xuất hiện.
Dialog hiển thị tên thành viên trong mô tả.
Click "Quay lại" → dialog đóng, không xoá gì.
Mở lại dialog → click "Xoá" → dialog đóng, thành viên biến mất khỏi bảng.
(Cũng kiểm tra từ trang chi tiết: click "Xoá" → dialog → confirm → chuyển về danh sách.)
result: issue
reported: "1 ok 2 ok 3 thành viên k biến mất"
severity: major

### 8. Chọn nhiều thành viên và áp dụng bulk status

expected: |
Check vào checkbox của 2–3 hàng → thanh MemberBulkActionBar xuất hiện phía trên bảng với text "{N} thành viên được chọn".
Check vào checkbox header → tất cả hàng được chọn (header checkbox ở trạng thái indeterminate khi chọn một phần).
Chọn trạng thái trong dropdown của thanh bulk → click "Áp dụng" → spinner hiển thị trong lúc xử lý.
Sau khi hoàn tất: Alert feedback xuất hiện thông báo kết quả (thành công/thất bại).
Click "Bỏ chọn tất cả" → thanh bulk ẩn đi, checkboxes được bỏ chọn.
result: skipped
reason: chức năng bulk tạm thời chưa cần

## Summary

total: 8
passed: 6
issues: 1
pending: 0
skipped: 1

## Gaps

- truth: "Sau khi xác nhận xoá từ dialog trong trang danh sách, thành viên phải biến mất khỏi bảng ngay lập tức"
  status: failed
  reason: "User reported: thành viên k biến mất sau khi click Xoá trong dialog"
  severity: major
  test: 7
  artifacts: []
  missing: []

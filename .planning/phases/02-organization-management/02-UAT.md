---
status: complete
phase: 02-organization-management
source: 02-organization-management-01-SUMMARY.md, 02-organization-management-02-SUMMARY.md, 02-organization-management-03-SUMMARY.md, 02-organization-management-04-SUMMARY.md
started: 2026-04-10T00:00:00Z
updated: 2026-04-10T05:58:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Xem danh sách tổ chức

expected: Mở /admin/organizations thấy trang danh sách kiểu bảng quản trị. Có ô tìm kiếm, lọc trạng thái, bảng danh sách, badge trạng thái tiếng Việt, phân trang/sắp xếp, và mỗi dòng có hành động xem chi tiết/chỉnh sửa/xóa.
result: pass

### 2. Lọc và tìm kiếm tổ chức

expected: Thay đổi từ khóa tìm kiếm hoặc trạng thái sẽ cập nhật danh sách tổ chức đúng theo điều kiện lọc, giữ trạng thái duyệt theo URL.
result: pass

### 3. Đi từ danh sách sang trang tạo mới

expected: Từ /admin/organizations có thể đi tới trang tạo mới. Trang mới hiển thị form tổ chức hợp lệ, cho nhập thông tin và sẵn sàng lưu.
result: pass

### 4. Tạo tổ chức mới

expected: Gửi form tạo mới thành công sẽ lưu dữ liệu và chuyển tới trang chi tiết /admin/organizations/[organizationId], hiển thị thông tin tổ chức vừa tạo.
result: pass

### 5. Chỉnh sửa tổ chức hiện có

expected: Từ danh sách hoặc chi tiết có thể vào trang chỉnh sửa. Form được hydrate sẵn dữ liệu, mã định danh ổn định chỉ hiển thị không cho sửa, lưu thành công rồi quay về trang chi tiết với dữ liệu đã cập nhật.
result: pass

### 6. Xem chi tiết tổ chức

expected: Trang chi tiết hiển thị thông tin tóm tắt cốt lõi của tổ chức, các hành động khả dụng, ngữ cảnh phòng ban ở dạng chỉ đọc, và có CTA để đi tới khu vực phòng ban lồng bên trong.
result: pass

### 7. Xóa tổ chức với kiểm tra ràng buộc

expected: Từ danh sách hoặc chi tiết, khi bấm xóa sẽ mở hộp thoại xác nhận dùng luồng guard chung. Nếu tổ chức còn phòng ban phụ thuộc thì phải hiện chặn/xác nhận phù hợp; nếu được phép xóa thì thao tác xóa mềm hoàn tất đúng.
result: pass

## Summary

total: 7
passed: 7
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

[none yet]

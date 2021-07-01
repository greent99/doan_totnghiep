create table category
(
	id int not null IDENTITY(1,1),
	name nvarchar(255) not null,
	code varchar(255) not null,
	parent_id int null,
	icon varchar(100),
	level int null,
	primary key (id)
)

select * from item where NguonDuLieu = 2

--level 1
insert into category (name, code, parent_id, icon, level) values ('root', 'root', null, null,0)
insert into category (name, code, parent_id, icon, level) values (N'điện thoại máy tính bảng', 'dien-thoai-may-tinh-bang', 1, 'https://cf.shopee.vn/file/31234a27876fb89cd522d7e3db1ba5ca_tn', 1)
insert into category (name, code, parent_id, icon, level) values (N'điện tử điện lạnh', 'dien-tu-dien-lanh', 1, 'https://cf.shopee.vn/file/978b9e4cb61c611aaaf58664fae133c5_tn', 1)
insert into category (name, code, parent_id, icon, level) values (N'điện gia dụng', 'dien-gia-dung', 1, 'https://cf.shopee.vn/file/7abfbfee3c4844652b4a8245e473d857_tn', 1)
insert into category (name, code, parent_id, icon, level) values (N'laptop- thiết bị it', 'laptop- thiết bị it', 1, 'https://cf.shopee.vn/file/c3f3edfaa9f6dafc4825b77d8449999d_tn', 1)
insert into category (name, code, parent_id, icon, level) values (N'đồ chơi mẹ và bé', 'do-choi-me-va-be', 1, 'https://cf.shopee.vn/file/099edde1ab31df35bc255912bab54a5e_tn', 1)
insert into category (name, code, parent_id, icon, level) values (N'Máy ảnh - máy quay phim', 'may-anh-may-quay-phim', 1, 'https://cf.shopee.vn/file/ec14dd4fc238e676e43be2a911414d4d_tn', 1)
insert into category (name, code, parent_id, icon, level) values (N'Sách, văn phòng phẩm', 'sach-van-phong-pham', 1, 'https://cf.shopee.vn/file/36013311815c55d303b0e6c62d6a8139_tn', 1)
insert into category (name, code, parent_id, icon, level) values (N'thời trang nam', 'thoi-trang-nam', 1, 'https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn', 1)
insert into category (name, code, parent_id, icon, level) values (N'thời trang nữ', 'thoi-trang-nu', 1, 'https://cf.shopee.vn/file/75ea42f9eca124e9cb3cde744c060e4d_tn', 1)
insert into category (name, code, parent_id, icon, level) values (N'phụ kiện thiết bị số', 'phu-kien-thiet-bi-so', 1, 'https://salt.tikicdn.com/ts/upload/73/e0/7d/af993bdbf150763f3352ffa79e6a7117.png', 1)

-- level 2 dien thoai may tinh bang
insert into category (name, code, parent_id, icon, level) values (N'Điện thoai', 'thiet-bi-di-dong', 2, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Máy tính bảng', 'may-tinh-bang', 2, null, 2)

--level 2 dien tu dien lanh
insert into category (name, code, parent_id, icon, level) values (N'Tivi', 'tivi', 3, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Máy điều hòa', 'may-lanh-may-dieu-hoa', 3, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Máy giặc', 'may-giat-cua-truoc', 3, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Tủ lạnh', 'tu-lanh', 3, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Tủ đông', 'tu-dong', 3, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Máy nước nóng', 'binh-may-nuoc-nong-truc-tiep', 3, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Máy sấy', 'may-say-may-giat-kem-say', 3, null, 2)

--level 2 phu kien thiet bi so
insert into category (name, code, parent_id, icon, level) values (N'Tai nghe bluetooth', 'tai-nghe-bluetooth', 11, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Tai nghe có dây', 'tai-nghe-co-day', 11, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Tai nghe gaming', 'tai-nghe-game-thu', 11, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Loa bluetooth', 'loa', 11, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Loa kéo', 'loa-keo-di-dong', 11, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Loa-soundbar-soundbass', 'loa-soundbar-soundbass', 11, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Pin sạc dự phòng', 'pin-sac-du-phong', 11, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Smartwatch', 'dong-ho-thong-minh', 11, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Chuột', 'chuot-game-thu', 11, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Bàn phím', 'ban-phim-game-thu', 11, null, 2)

-- level 2 laptop thiet bi it
insert into category (name, code, parent_id, icon, level) values (N'Laptop', 'laptop', 5, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Ổ cứng', 'o-cung-gan-trong', 5, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Usb', 'usb', 5, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Ram máy tính', 'ram-may-tinh', 5, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Card màn hình', 'card-man-hinh', 5, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Phụ kiện máy in', 'phu-kien-may-in', 5, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Mực in', 'muc-in', 5, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Máy in laser', 'may-in-laser', 5, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Máy in ảnh', 'may-in-anh', 5, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Máy chiếu', 'may-chieu', 5, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Phụ kiện máy chiếu', 'phu-kien-may-chieu', 5, null, 2)

--level 2 dien gia dung
insert into category (name, code, parent_id, icon, level) values (N'Nồi cơm điện', 'noi-com-dien', 4, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Lò vi sóng', 'lo-vi-song', 4, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Bếp điện từ', 'bep-dien-tu', 4, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Bếp gas', 'bep-ga', 4, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Bếp hồng ngoại', 'bep-hong-ngoai', 4, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Máy pha cà phê', 'may-pha-ca-phe', 4, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Nồi áp suất', 'noi-ap-suat-dien', 4, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Lò nướng điện', 'lo-nuong', 4, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Bình thủy điện', 'am-dun-nuoc-binh-thuy-dien', 4, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Máy hút bụi cầm tay', 'may-hut-bui-cam-tay', 4, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Máy hút bụi gia đình', 'may-hut-bui-gia-dinh', 4, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Robot hút bụi', 'robot-hut-bui', 4, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Phụ kiện máy hút bụi', 'linh-kien-phu-kien-may-hut-bui', 4, null, 2)

--level 2 đồ chơi mẹ và bé
insert into category (name, code, parent_id, icon, level) values (N'Đồ chơi', 'do-choi', 6, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Tả&bỉm', 'bim-ta', 6, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Sữa dinh dưỡng', 'sua-va-thuc-an-dam', 6, null, 2)

--level 2 máy ảnh, máy quay film
insert into category (name, code, parent_id, icon, level) values (N'Ống kính', 'ong-kinh', 7, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Camera giám sát', 'camera-giam-sat', 7, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Pin, sạc máy ảnh', 'pin-sac', 7, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Phụ kiện cho ống kính', 'phu-kien-ong-kinh', 7, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Máy ảnh', 'may-anh', 7, null, 2)

-- level 2 sách, văn phòng phẩm
insert into category (name, code, parent_id, icon, level) values (N'Sách thiếu nhi', 'sach-thieu-nhi', 8, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Văn phòng phẩm', 'van-phong-pham', 8, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Sách văn học', 'sach-van-hoc-tieu-thuyet', 8, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Sách kinh tế', 'sach-kinh-te', 8, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Sách kỹ năng sống', 'sach-thuong-thuc-doi-song', 8, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Sách văn hóa du lịch', 'sach-van-hoa-du-lich', 8, null, 2)

--level 2 thời trang nam
insert into category (name, code, parent_id, icon, level) values (N'Áo thun nam', 'ao-nam', 9, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Áo sơ mi nam', 'ao-so-mi-nam', 9, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Quần tây', 'quan-tay-cho-nam', 9, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Balo nam', 'balo-nam', 9, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Ví nam', 'vi-bop-nam', 9, null, 2)

--level 2 thời trang nữ
insert into category (name, code, parent_id, icon, level) values (N'Đầm dáng xòe', 'dam-xoe', 10, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Giày cao gót', 'giay-dep-cao-got-nu', 10, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Giày búp bê', 'giay-bup-be', 10, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Ví,bóp nữ', 'vi-bop-nu', 10, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Túi đeo chéo nữ', 'tui-deo-cheo-nu', 10, null, 2)
insert into category (name, code, parent_id, icon, level) values (N'Giày boots nữ', 'giay-bot-nu', 10, null, 2)

























-- level 2



-- Phụ kiện thiết bị số 


-- laptop thiết bị it
insert into category (name, code, parent_id, icon, level) values (N'tai nghe', 'tai-nghe', 5, null, 2)

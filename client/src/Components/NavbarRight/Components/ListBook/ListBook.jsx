import classNames from 'classnames/bind';
import styles from './ListBook.module.scss';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from 'react';
import { requestGetBorrowBooks } from '../../../../config/Config';

const cx = classNames.bind(styles);

function ListBook() {
    const [dataBook, setDataBook] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestGetBorrowBooks();
            setDataBook(res);
        };
        fetchData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'category', headerName: 'Thể Loại', width: 130 },
        { field: 'nameBook', headerName: 'Tên sách', width: 290 },
        { field: 'author', headerName: 'Tác Giả', width: 130 },
        { field: 'language', headerName: 'Ngôn Ngữ', width: 130 },
        { field: 'quantity', headerName: 'Số Lượng', width: 130 },
        {
            field: 'status',
            headerName: 'Trạng Thái',
            width: 130,
            renderCell: (params) => (
                <span style={{ color: params.value === 'Còn Hạn' ? 'green' : 'red' }}>{params.value}</span>
            ),
        },
        { field: 'date', headerName: 'Ngày Mượn', width: 130 },
        { field: 'expirationDate', headerName: 'Ngày Hết Hạn', width: 130 },
    ];

    const rows = dataBook.map((item) => {
        // Cập nhật trạng thái dựa trên giá trị status
        let updatedStatus;
        if (item.status === '1') {
            updatedStatus = 'Còn Hạn';
        } else if (item.status === '2') {
            updatedStatus = 'Hết Hạn';
        } else {
            updatedStatus = 'Không Xác Định'; // Hoặc giá trị mặc định nếu không phải 1 hoặc 2
        }

        return {
            id: item.id,
            category: item.category,
            nameBook: item.nameBook,
            author: item.author,
            language: item.language,
            quantity: item.quantity,
            status: updatedStatus, // Sử dụng trạng thái đã cập nhật
            date: new Date(item.date1).toLocaleDateString('vi-VN'), // Định dạng ngày mượn
            expirationDate: new Date(item.date2).toLocaleDateString('vi-VN'), // Định dạng ngày hết hạn
        };
    });

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <div className={cx('wrapper')}>
            <h2>Lịch Sử Mượn Sách</h2>
            <Paper style={{ marginTop: '40px' }} sx={{ height: '95%', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
}

export default ListBook;

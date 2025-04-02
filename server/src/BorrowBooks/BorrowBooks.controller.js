const modelBorrowBooks = require('./BorrowBooks.model');
const modelBook = require('../Books/Book.model');

const { jwtDecode } = require('jwt-decode');

class BorrowBooks {
    async BorrowBooksUser(req, res) {
        const { masv, username, khoa, quantity, type, date1, date2, idBook } = req.body;
        const token = req.headers.cookie.split('=')[1];
        if (!token) return;
        const dataUser = jwtDecode(token);
        const findBook = await modelBook.findOne({ where: { id: idBook } });
        if (findBook.quantity < quantity) {
            return res.status(500).json({ message: 'Số lượng sách trong kho không đủ !!!' });
        }
        try {
            const data = await modelBorrowBooks.create({
                masv,
                username,
                email: dataUser.email,
                khoa,
                quantity,
                type,
                date1,
                date2,
                nameBook: findBook.nameBook,
                author: findBook.author,
                category: findBook.category,
                language: findBook.language,
                images: findBook.images,
                status: '1',
                content: findBook.content,
            });
            await data.save();
            await modelBook.update({ quantity: findBook.quantity - quantity }, { where: { id: idBook } });

            return res.status(200).json({ message: 'Mượn Sách Thành Công !!!' });
        } catch (error) {
            console.log(error);

            return res.status(500).json({ message: 'Error occurred', error });
        }
    }

    async getAllBorrowBooks(req, res) {
        const token = req.headers.cookie.split('=')[1];
        if (!token) return;
        const dataUser = jwtDecode(token);

        if (dataUser) {
            const data = await modelBorrowBooks.findAll({
                where: { email: dataUser.email },
            });
            return res.status(200).json(data);
        } else {
            return res.status(500).json({ message: 'Error occurred' });
        }
    }
}

module.exports = new BorrowBooks();

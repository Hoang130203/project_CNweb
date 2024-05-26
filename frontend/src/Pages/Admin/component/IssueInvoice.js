import jsPDF from "jspdf";
import 'jspdf-autotable';
import { font } from "./font";
import { convertColor } from "../../../Api/OtherFunction";


class ExportHoaDon {
    Export(content) {
        var doc = new jsPDF('l', 'px', 'a4');
        doc.addPage(1000, 1500);
        doc.internal.getNumberOfPages(); // lay page hiện tại 2
        //Giờ mình muốn quay trở lại làm việc vs page 1 thì dùng
        doc.setPage(1);
        doc.text(2, 2, content);
    }

    GenerateInvoice = async (invoiceInfo) => {
        const doc = new jsPDF();
        doc.addFileToVFS("WorkSans-normal.ttf", font);
        doc.addFont("WorkSans-normal.ttf", "WorkSans", "normal");
        doc.setFont("WorkSans");
        doc.setFontSize(15);
        doc.setTextColor(255, 0, 0);
        doc.text('W15 Store', 35, 10, 'center');
        
        const currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        var hour = currentDate.getHours();
        var minute = currentDate.getMinutes();
        var second = currentDate.getSeconds();
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`${hour}:${minute}:${second}` + ' ngày ' + day + ', tháng ' + month + ', năm ' + year, 130, 10, 'center');
        doc.setFontSize(30);
        doc.setTextColor(0, 0, 0);
        doc.text('Hóa đơn', 105, 30, 'center');
        doc.setFontSize(12);
        
        let verticalPosition = 40;
        doc.text(`Tên hóa đơn: Hóa đơn sản phẩm`, 20, verticalPosition);
        verticalPosition += 10;
        doc.text(`Mã Hóa đơn: ${invoiceInfo.id}`, 20, verticalPosition);
        verticalPosition += 10;

        const tableColumn = ['Số thứ tự', 'Tên sản phẩm', 'Size', 'Màu', 'Đơn giá', 'Số lượng', 'Tổng'];
        const tableRows = invoiceInfo.products.map((product, index) => [
            index + 1,
            product?.product?.name,
            product?.size?.name,
            `${convertColor(product?.color?.name)}`,
            `${product.cost?.toLocaleString()} đ`,
            product.quantity,
            `${(product.cost * product.quantity).toLocaleString()} đ`,
        ]);

        doc.autoTable({
            startY: verticalPosition,
            head: [tableColumn],
            body: tableRows,
            styles: { font: "WorkSans" }
        });

        verticalPosition += 14 * invoiceInfo.products.length;
        doc.text(`Tổng tiền: ${invoiceInfo.totalCost?.toLocaleString()} đ`, 180, verticalPosition, null, null, 'right');
        verticalPosition += 10;

        doc.text(`Khách hàng: ${invoiceInfo.user.name}`, 20, verticalPosition);
        verticalPosition += 10;
        doc.text(`Địa chỉ: ${invoiceInfo.user.address}`, 20, verticalPosition);
        verticalPosition += 10;
        doc.text(`Thời gian đặt: ${invoiceInfo.time}`, 20, verticalPosition);
        verticalPosition += 10;
        doc.text(`Trạng thái: ${invoiceInfo.status}`, 20, verticalPosition);
        verticalPosition += 10;
        doc.text(`Người bán: W15 Store`, 20, verticalPosition);

        doc.save('invoice.pdf');
    };
}

export default new ExportHoaDon();

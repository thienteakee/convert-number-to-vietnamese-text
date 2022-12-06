// Hàm chuyển đổi số 3 chữ số thành chữ
function convert3DNumberToText(number) {
    let resultArray = [];
    let subResultArray = [];
    let txtNumber = number.toString();

    const viH = 'Trăm';
    const viU = ['Không', 'Một', 'Hai', 'Ba', 'Bốn', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín'];
    const viT = ['Lẻ', 'Mười', 'Hai Mươi', 'Ba Mươi', 'Bốn Mươi', 'Năm Mươi', 'Sáu Mươi', 'Bảy Mươi', 'Tám Mươi', 'Chín Mươi'];
    const special1 = 'Mốt';
    const special4 = 'Tư';
    const special5 = 'Lăm';

    switch (txtNumber.length) {

        // Trường hợp số có 3 chữ số
        case 3:
            // Nếu cả ba số đều là 0 thì sẽ bỏ qua
            if (txtNumber[0] == 0 && txtNumber[1] == 0 && txtNumber[2] == 0) {
                break;
            }

            // Nếu số thứ hai và số thứ ba là 0 thì sẽ chỉ đọc số thứ nhất ghép với từ "Trăm"
            if (txtNumber[1] == 0 && txtNumber[2] == 0) {
                resultArray.push(viU[txtNumber[0]], viH);
                break;
            }

            // Nếu không thuộc các trường hợp trên thì sẽ đọc ghép số thứ nhất với từ "Trăm", số thứ hai và số thứ ba
            subResultArray.push(viU[txtNumber[0]], viH);
            resultArray = subResultArray.concat(convert3DNumberToText(txtNumber.substr(1)));
            break;

        // Trường hợp số có 2 chữ số
        case 2:

            // Nếu số thứ hai là 0 thì sẽ chỉ đọc số thứ nhất
            if (txtNumber[1] == 0) {
                resultArray.push(viT[txtNumber[0]]);
                break;
            }

            // Nếu số thứ nhất lớn hơn 1 và số thứ hai là 1 thì số 1 sẽ đọc là "mốt"
            if (txtNumber[0] > 1 && txtNumber[1] == 1) {
                resultArray.push(viT[txtNumber[0]], special1);
                break;
            }

            // Nếu số thứ nhất khác 1 và số thứ hai là 4 thì số 4 sẽ đọc là "tư"
            if (txtNumber[0] != 1 && txtNumber[1] == 4) {
                resultArray.push(viT[txtNumber[0]], special4);
                break;
            }

            // Nếu số thứ nhất lớn hơn 0 và số thứ hai là 5 thì số 5 sẽ đọc là "lăm"
            if (txtNumber[0] > 0 && txtNumber[1] == 5) {
                resultArray.push(viT[txtNumber[0]], special5);
                break;
            }

            // Nếu không thuộc các trường hợp trên thì sẽ đọc ghép số thứ nhất với số thứ hai
            resultArray.push(viT[txtNumber[0]], viU[txtNumber[1]]);
            break;

        // Trường hợp số có 1 chữ số
        default:
            resultArray.push(viU[txtNumber]);
            break;
    }

    // Trả về kết quả là các phần tử đã được nối với nhau bằng khoảng trống
    return resultArray.join(' ');
}

// Hàm chuyển đổi số thành chữ
function convertNumberToText(number) {
    let resultArray = [];

    const validNumber = BigInt(number);
    const separatorText = ['Nghìn', 'Triệu', 'Tỉ', 'Nghìn Tỉ', 'Triệu Tỉ', 'Tỉ Tỉ', 'Nghìn Tỉ Tỉ', 'Triệu Tỉ Tỉ', 'Tỉ Tỉ Tỉ'];

    // Phân tách các hàng đơn vị
    const formattedNumber = validNumber.toLocaleString('vi-VN');

    // Tạo mảng và đảo ngược mảng để trùng khớp với tên các hàng đơn vị
    const formattedNumberArray = formattedNumber.split('.').reverse();

    // Chạy vòng lặp để ghép hàng đơn vị đúng với tên của chúng
    for (let i = (formattedNumberArray.length - 1); i > -1; i --) {

        // Nếu hàng đơn vị khác "000" thì sẽ đọc ghép đúng với tên của chúng
        if (formattedNumberArray[i] != '000') {
            resultArray.push(convert3DNumberToText(formattedNumberArray[i]), separatorText[i - 1]);
        }
    }

    // Trả về kết quả là các phần tử đã được nối với nhau bằng khoảng trống
    return resultArray.join(' ');
}

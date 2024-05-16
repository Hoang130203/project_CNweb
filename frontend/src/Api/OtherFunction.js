export function convertColor(color) {
    const colors = [
        { 'RED': 'Đỏ' },
        { 'GREEN': 'Xanh lá' },
        { 'BLUE': 'Xanh dương' },
        { 'YELLOW': 'Vàng' },
        { 'ORANGE': 'Cam' },
        { 'PURPLE': 'Tím' },
        { 'PINK': 'Hồng' },
        { 'WHITE': 'Trắng' },
        { 'BLACK': 'Đen' },
    ]
    return colors.find(c => c[color])?.[color] || color;
}
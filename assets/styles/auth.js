export const authStyles = (deviceType) => {
    return (deviceType == 'tablet' ? require('./tablet/auth') : require('./phone/auth'));
}

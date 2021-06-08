
export const commonStyles = (deviceType) => {
    return (deviceType == 'tablet' ? require('./tablet/common') : require('./phone/common'));
}

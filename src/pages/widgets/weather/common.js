import React from 'react';

export const showWeatherIcon = (icon) => {
    let weatherIcon;

    const i = 'i' + icon;

    return weatherIcons.icons[i];
}

const weatherIcons = {
    icons: {
        i01d: require('../../../../assets/images/weather/01d.png'),
        i01n: require('../../../../assets/images/weather/01n.png'),
        i02d: require('../../../../assets/images/weather/02d.png'),
        i02n: require('../../../../assets/images/weather/02n.png'),
        i03d: require('../../../../assets/images/weather/03d.png'),
        i03n: require('../../../../assets/images/weather/03n.png'),
        i04d: require('../../../../assets/images/weather/04d.png'),
        i04n: require('../../../../assets/images/weather/04n.png'),
        i09d: require('../../../../assets/images/weather/09d.png'),
        i09n: require('../../../../assets/images/weather/09n.png'),
        i10d: require('../../../../assets/images/weather/10d.png'),
        i10n: require('../../../../assets/images/weather/10n.png'),
        i11d: require('../../../../assets/images/weather/11d.png'),
        i13d: require('../../../../assets/images/weather/13d.png'),
        i13n: require('../../../../assets/images/weather/13n.png'),
        i50d: require('../../../../assets/images/weather/50d.png'),
        i50n: require('../../../../assets/images/weather/50n.png'),
    }
}

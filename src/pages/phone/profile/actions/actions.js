import Share from 'react-native-share';

export const inviteFriends = (user) => {
    const url = 'https://inpark.today/invite/friends/' + user.uuid;
    console.log(url);
    const title = 'InPark Today - invitation';
    const subject = user.name + " wants you to join InPark app";
    const message = "Join InParkToday"
    const options = Platform.select({
        ios: {
            activityItemSources: [
                { // For sharing url with custom title.
                    placeholderItem: {type: 'url', content: url},
                    item: {
                        default: {type: 'url', content: url},
                    },
                    subject: {
                        default: title,
                    },
                    linkMetadata: {originalUrl: url, url, title},
                },
                { // For sharing text.
                    placeholderItem: {type: 'text', content: message},
                    item: {
                        default: {type: 'text', content: message},
                        message: null, // Specify no text to share via Messages app.
                    },
                    linkMetadata: { // For showing app icon on share preview.
                        title: message,
                    },
                },
                { // For using custom icon instead of default text icon at share preview when sharing with message.
                    placeholderItem: {
                        type: 'url',
                        // content: icon
                    },
                    item: {
                        default: {
                            type: 'text',
                            content: `${message} ${url}`,
                        },
                    },
                    linkMetadata: {
                        title: message,
                        // icon: icon
                    },
                },
            ],
        },
        default: {
            title,
            subject: title,
            message: `${message} ${url}`,
        },
    });

    const options2 = {
        title: title,
        message: message,
        url: url,
        subject: subject,
    };

    Share.open(options2)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            err && console.log(err);
        });
}

export const handleSetFavouriteArticle = (params) => {

}

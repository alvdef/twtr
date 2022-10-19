
export const parseTweet = tweet => {
    let { text } = tweet;
    const lastIndexOfSpace = text.lastIndexOf(' ');

    if (lastIndexOfSpace !== -1) {
        text = text.substring(0, lastIndexOfSpace)
        Object.assign(tweet, {text: text});
    }
    return text;
}
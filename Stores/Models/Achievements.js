class Achievement {
    Date = '';

    Price = 0;

    IconName = '';

    IconColor = '';

    Description = '';

    Title = '';

    constructor(date, price, iconName, iconColor, description, title) {
        this.Date = date;
        this.Price = price;
        this.IconName = iconName;
        this.IconColor = iconColor;
        this.Description = description;
        this.Title = title;
    }
}

export default Achievement;

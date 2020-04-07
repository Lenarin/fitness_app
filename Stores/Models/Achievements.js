class Achievement {
    Id = null;

    Date = '';

    Price = 0;

    IconName = '';

    IconColor = '';

    Description = '';

    Title = '';

    constructor(date, price, iconName, iconColor, description, title, id = null) {
        this.Date = date;
        this.Price = price;
        this.IconName = iconName;
        this.IconColor = iconColor;
        this.Description = description;
        this.Title = title;
        this.Id = id;
    }
}

export default Achievement;

export const product = {
  items: [
    {
      id: 1,
      name: "Book",
      image:
        "https://api.time.com/wp-content/uploads/2015/06/521811839-copy.jpg?quality=85&w=507&h=338&crop=1",
      company: "Thomson Reuters",
      price: 250,
      amount: 1,
      description:
        "The manual provides a broad overview of bankruptcy; discusses the establishment of a claim in a bankruptcy case; highlights the effects of the bankruptcy petition, including retention of counsel and the automatic stay; outlines the jurisdiction of the bankruptcy court; explores procedural considerations such as removal, remand and abstention; addresses discharge and discharge ability of debts; and highlights issues related to settlements.",
    },
    {
      id: 2,
      name: "Pen",
      image:
        "https://www.amrita.edu/sites/default/files/styles/news_banner_imagesbreakpoints_theme_norma_tablet_1x/public/fountain-pen-blog.jpg?itok=f-nqerRx&timestamp=1548828364",
      company: "MONTBLANC",
      price: 150,
      amount: 1,

      description:
        "A Montblanc pen is the epitome of luxury and finesse. Whether it’s a Montblanc fountain pen, Montblanc ballpoint pen or Montblanc rollerball pen, Montblanc pens have come to set a standard that aptly mirrors the loftiness of the peak from which the brand takes its name. Elegant and refined, a Montblanc fountain pen at any price is a gentleman’s requisite. With the highest quality of craftsmanship, creative vision and durability, a Montblanc ballpoint pen or a Montblanc rollerball pen is a must-own all the same, and worthy of handing down to the next generation. William Penn is an authorised dealer of Montblanc. Every Montblanc pen on sale with us carries Montblanc's certificate of authenticity and warranty, which is sealed, numbered and stamped.",
    },
    {
      id: 3,
      name: "Laptop",
      image:
        "https://cdn.vox-cdn.com/thumbor/zz23VuQsj-qpsdhGIDfsxdSZ5kY=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19915588/akrales_200421_3975_0080.jpg",
      company: "Dell inspiron",
      price: 26000,
      amount: 1,

      description:
        "Dell Inspiron is a Windows 10 laptop with a 15.60-inch display that has a resolution of 1920x1080 pixels. It is powered by a APU Quad Core A6 processor and it comes with 8GB of RAM. The Dell Inspiron packs 1TB of HDD storage. Graphics are powered by Nvidia GeForce GTX 1050.",
    },
  ],
  count: 0,
  total: 0,
  addedItems: [],
};

export const loadFromLocalStorage = () => {
  try {
    const serialState = localStorage.getItem("cartState");
    if (serialState === null) {
      return undefined;
    }
    return JSON.parse(serialState);
  } catch (err) {
    return undefined;
  }
};

export const saveToLocalStorage = (state) => {
  try {
    const serialState = JSON.stringify(product);
    localStorage.setItem("cartState", serialState);
  } catch (err) {
    console.log(err);
  }
};

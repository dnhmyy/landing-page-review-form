export interface Branch {
    id: number;
    name: string;
    wa: string;
    address: string;
    hours: string;
    mapUrl: string;
    image: string;
}

export const branches: Branch[] = [
    {
        id: 1,
        name: "Roti Kebanggaan Sorrento",
        wa: "6281231188181",
        address: "South Sorrento No. 16, Gading Serpong",
        hours: "07:00 - 21:00",
        mapUrl: "https://maps.google.com/",
        image: "/images/logo.png"
    },
    {
        id: 2,
        name: "Roti Kebanggaan Beryl",
        wa: "6281218918881",
        address: "Jl. Beryl 3 No. 31, Gading Serpong",
        hours: "07:00 - 21:00",
        mapUrl: "https://maps.google.com/",
        image: "/images/logo.png"
    },
    {
        id: 3,
        name: "Roti Kebanggaan Downtown",
        wa: "6282118888181",
        address: "Ruko Downtown Drive No. 07, Gading Serpong",
        hours: "07:00 - 21:00",
        mapUrl: "https://maps.google.com/",
        image: "/images/outlet/Downtown.jpg"
    },
    {
        id: 4,
        name: "Roti Kebanggaan Greenlake",
        wa: "6282311888181",
        address: "Ruko Columbus A/28, Green Lake City",
        hours: "07:00 - 21:00",
        mapUrl: "https://maps.google.com/",
        image: "/images/logo.png"
    },
    {
        id: 5,
        name: "Roti Kebanggaan Mall Kelapa Gading (Gafoy)",
        wa: "6282311888188",
        address: "GAFOY 1-B, Mall Kelapa Gading",
        hours: "07:00 - 22:00",
        mapUrl: "https://maps.google.com/",
        image: "/images/logo.png"
    },
    {
        id: 6,
        name: "Roti Kebanggaan Mall Grand Indonesia",
        wa: "6282118111181",
        address: "East Mall Lt. 5, Grand Indonesia",
        hours: "09:00 - 22:00",
        mapUrl: "https://maps.google.com/",
        image: "/images/logo.png"
    },
];

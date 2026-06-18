import { m } from "framer-motion";

export const content = {
  welcome: {
    greeting: "Hola,",
    name: "Monica :)",
    message: "He creado este pequeño espacio solo para ti, por tu cumpleaños. Tómate tu tiempo, lee y continúa lentamente.",
    buttonText: "Comenzar"
  },
  letter: {
    title: "Una pequeña carta",
    paragraphs: [
      "Quería hacer algo diferente en tu cumple, no solo un mensaje, sinó un lugar donde puedas ingresar cada vez que quieras...",
      "Trate de mezclar lo que estás aprendiendo con cosas que me gustan, espero te guste el resultado.",
      "¿Por qué lo hice? Me has demostrado tu compañía vas más allá de lo esperado, te siento en cada rincón de mi ser, en cada sueño, en cada pensamiento, en cada suspiro.",
      "Encuentro en tí esa tranquilidad que se necesita en un mundo tan lleno de caos, tu amor me acobija y me hace sentir seguro, por esa y muchas cosas más es que estás viendo esto ahora.",
      "Espero lo disfrutes mucho tanto como yo disfruté haciendo este detalle para ti"
    ],
    sign: "Con cariño, Andres :)."
  },
  moments: {
    title: "Nuestros Momentos",
    photos: [
      {
        path: "/photos/01.jpg",
        caption: "Nuestra primer salida juntos :)"
      },
      {
        path: "/photos/02.jpg",
        caption: "Nuestra primer foto juntos!!!!"
      },
      {
        path: "/photos/03.jpg",
        caption: "Ella, radiante y bella como siempre"
      },
      {
        path: "/photos/04.jpg",
        caption: "Visitando el centro de la felicidad"
      },
      {
        path: "/photos/05.jpg",
        caption: "Un cafecito y una torta red velvet;D"
      },
      {
        path: "/photos/06.jpg",
        caption: "Sus almendrados ojos que me encantan"
      }
    ]
  },
  music: {
    title: "Para escuchar",
    description: "Esta canción me recuerda a ti, me recuerda a nosotros."
  },
  details: {
    title: "Pequeñas cosas que ADORO de ti.",
    items: [
      "Me encantan tus ojos almendrados, son los mejores.",
      "Adoro tu compañía y la forma en como conectamos.",
      "Me encanta tu forma de ser y tus ocurrencias.",
      "Me gusta cuando me abrazas, me siento seguro a tu lado.",
    ]
  },
  challenge: {
    title: "Un curioso ingreso",
    description: "Debes descubrir los secretos ocultos para poder continuar.",
    part1: {
      hint: "Primera pista: Tu lo pensaste, pero tu lo dijiste!!!",
      answer: "twins"
    },
    part2: {
      hint: "Antes de continuar necesitarás una clave.\n\nHace algún tiempo te preguntaron cuál sería la clave perfecta para un pequeño desafío.\n\nTu respuesta sigue siendo válida\n\nMetodo: Cifrado Vigenère\n\n",
      cipherText: "VWDUW-PZMASE-AAQJMBQG",
      answer: "jorge-dramas-socrates"
    },
    successMessage: "Secretos revelados...",
    errorMessage: "Parece que la tinta se ha corrido. Intenta de nuevo."
  },
  finalMessage: {
    title: "Para terminar...",
    content: "Anhelo vivir momentos como estos por mucho tiempo, espero que tu también sientas lo mismo y que podamos ser twins por mucho tiempo más. \n\nTe adoro, Monica.",
    ps: "P.D. Siempre podrás volver aquí cuando lo necesites:D."
  }
};

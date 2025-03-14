//compatibility-game.component.ts

import { Component, type OnInit } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"

interface PersonProfile {
  name: string
  age: number
  favoriteColor: string
  hobby: string
  musicGenre: string
  movieGenre: string
  personality: string
  favoriteFood: string
  zodiacSign: string
}

interface CompatibilityRecord {
  id: string
  date: string
  mode: GameMode
  person1: PersonProfile
  person2: PersonProfile
  percentage: number
  message: string
}

type GameState = "start" | "mode-select" | "input-names" | "input-details" | "loading" | "result" | "history"
type GameMode = "friends" | "couple"

@Component({
  selector: "app-compatibility-game",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./compatibility-game.component.html",
  styleUrls: ["./compatibility-game.component.css"],
})
export class CompatibilityGameComponent implements OnInit {
  gameState: GameState = "start"
  gameMode: GameMode = "couple"

  person1: PersonProfile = this.getEmptyProfile()
  person2: PersonProfile = this.getEmptyProfile()

  compatibilityPercentage: number | null = null
  loadingProgress = 0
  loadingInterval: any
  compatibilityHistory: CompatibilityRecord[] = []

  personalityTypes = [
    "Introvertido/a",
    "Extrovertido/a",
    "Creativo/a",
    "Analítico/a",
    "Aventurero/a",
    "Tranquilo/a",
    "Soñador/a",
    "Práctico/a",
    "Empático/a",
    "Racional",
    "Optimista",
    "Pesimista",
    "Perfeccionista",
    "Relajado/a",
    "Competitivo/a",
    "Cooperativo/a",
  ]

  musicGenres = [
    "Pop",
    "Rock",
    "Reggaeton",
    "Hip Hop",
    "Electrónica",
    "K-pop",
    "Indie",
    "Clásica",
    "Jazz",
    "Metal",
    "R&B",
    "Country",
    "Trap",
    "Punk",
    "Blues",
    "Reggae",
    "Salsa",
    "Bachata",
    "Flamenco",
    "Folk",
    "Alternativo",
    "EDM",
    "Techno",
    "House",
  ]

  movieGenres = [
    "Acción",
    "Comedia",
    "Romance",
    "Terror",
    "Ciencia Ficción",
    "Fantasía",
    "Animación",
    "Drama",
    "Documentales",
    "Aventura",
    "Thriller",
    "Misterio",
    "Musical",
    "Histórica",
    "Bélica",
    "Western",
    "Superhéroes",
    "Anime",
    "Deportes",
    "Biográfica",
  ]

  foodTypes = [
    "Pizza",
    "Hamburguesa",
    "Sushi",
    "Tacos",
    "Pasta",
    "Ensalada",
    "Helado",
    "Chocolate",
    "Pollo",
    "Paella",
    "Curry",
    "Ramen",
    "Asado",
    "Mariscos",
    "Vegetariana",
    "Postres",
    "Comida rápida",
    "Comida casera",
    "Comida picante",
    "Dulces",
  ]

  zodiacSigns = [
    "Aries",
    "Tauro",
    "Géminis",
    "Cáncer",
    "Leo",
    "Virgo",
    "Libra",
    "Escorpio",
    "Sagitario",
    "Capricornio",
    "Acuario",
    "Piscis",
  ]

  zodiacCompatibility: Record<string, Record<string, number>> = {
    Aries: {
      Aries: 70,
      Tauro: 60,
      Géminis: 85,
      Cáncer: 65,
      Leo: 90,
      Virgo: 45,
      Libra: 80,
      Escorpio: 50,
      Sagitario: 95,
      Capricornio: 55,
      Acuario: 75,
      Piscis: 65,
    },
    Tauro: {
      Aries: 60,
      Tauro: 80,
      Géminis: 55,
      Cáncer: 90,
      Leo: 70,
      Virgo: 95,
      Libra: 75,
      Escorpio: 85,
      Sagitario: 50,
      Capricornio: 95,
      Acuario: 40,
      Piscis: 85,
    },
    Géminis: {
      Aries: 85,
      Tauro: 55,
      Géminis: 75,
      Cáncer: 60,
      Leo: 85,
      Virgo: 75,
      Libra: 95,
      Escorpio: 60,
      Sagitario: 90,
      Capricornio: 50,
      Acuario: 95,
      Piscis: 65,
    },
    Cáncer: {
      Aries: 65,
      Tauro: 90,
      Géminis: 60,
      Cáncer: 85,
      Leo: 65,
      Virgo: 80,
      Libra: 60,
      Escorpio: 95,
      Sagitario: 55,
      Capricornio: 75,
      Acuario: 50,
      Piscis: 95,
    },
    Leo: {
      Aries: 90,
      Tauro: 70,
      Géminis: 85,
      Cáncer: 65,
      Leo: 85,
      Virgo: 60,
      Libra: 90,
      Escorpio: 65,
      Sagitario: 95,
      Capricornio: 55,
      Acuario: 70,
      Piscis: 60,
    },
    Virgo: {
      Aries: 45,
      Tauro: 95,
      Géminis: 75,
      Cáncer: 80,
      Leo: 60,
      Virgo: 80,
      Libra: 65,
      Escorpio: 90,
      Sagitario: 50,
      Capricornio: 95,
      Acuario: 60,
      Piscis: 75,
    },
    Libra: {
      Aries: 80,
      Tauro: 75,
      Géminis: 95,
      Cáncer: 60,
      Leo: 90,
      Virgo: 65,
      Libra: 80,
      Escorpio: 70,
      Sagitario: 85,
      Capricornio: 65,
      Acuario: 95,
      Piscis: 70,
    },
    Escorpio: {
      Aries: 50,
      Tauro: 85,
      Géminis: 60,
      Cáncer: 95,
      Leo: 65,
      Virgo: 90,
      Libra: 70,
      Escorpio: 85,
      Sagitario: 60,
      Capricornio: 80,
      Acuario: 55,
      Piscis: 95,
    },
    Sagitario: {
      Aries: 95,
      Tauro: 50,
      Géminis: 90,
      Cáncer: 55,
      Leo: 95,
      Virgo: 50,
      Libra: 85,
      Escorpio: 60,
      Sagitario: 85,
      Capricornio: 65,
      Acuario: 90,
      Piscis: 70,
    },
    Capricornio: {
      Aries: 55,
      Tauro: 95,
      Géminis: 50,
      Cáncer: 75,
      Leo: 55,
      Virgo: 95,
      Libra: 65,
      Escorpio: 80,
      Sagitario: 65,
      Capricornio: 85,
      Acuario: 70,
      Piscis: 85,
    },
    Acuario: {
      Aries: 75,
      Tauro: 40,
      Géminis: 95,
      Cáncer: 50,
      Leo: 70,
      Virgo: 60,
      Libra: 95,
      Escorpio: 55,
      Sagitario: 90,
      Capricornio: 70,
      Acuario: 85,
      Piscis: 80,
    },
    Piscis: {
      Aries: 65,
      Tauro: 85,
      Géminis: 65,
      Cáncer: 95,
      Leo: 60,
      Virgo: 75,
      Libra: 70,
      Escorpio: 95,
      Sagitario: 70,
      Capricornio: 85,
      Acuario: 80,
      Piscis: 90,
    },
  }

  coupleCompatibilityMessages = [
    { min: 0, max: 10, message: "¡Uff! Son como agua y aceite. ¡Mejor ni lo intenten! 🙅‍♂️" },
    { min: 11, max: 20, message: "Hay más posibilidades de que un pingüino vuele... 🐧❌" },
    { min: 21, max: 30, message: "Mmm... tendrían que esforzarse MUCHO para llevarse bien 😬" },
    { min: 31, max: 40, message: "No es imposible, pero casi... ¡Suerte con eso! 🍀" },
    { min: 41, max: 50, message: "Ni bien ni mal, una relación... quizás? 🤔" },
    { min: 51, max: 60, message: "Hay potencial, pero necesitarán trabajar en su relación 💪" },
    { min: 61, max: 70, message: "¡No está mal! Podrían ser una buena pareja 👍" },
    { min: 71, max: 80, message: "¡Buena compatibilidad! Definitivamente hay química entre ustedes ✨" },
    { min: 81, max: 90, message: "¡Wow! ¡Son super compatibles! ¡Podrían ser la pareja perfecta! 💕" },
    { min: 91, max: 100, message: "¡INCREÍBLE! ¡Están hechos el uno para el otro! ¡Almas gemelas! 💯❤️" },
  ]

  friendCompatibilityMessages = [
    { min: 0, max: 10, message: "¡Vaya! Parece que son de planetas diferentes. ¡Mejor mantenerse alejados! 🪐" },
    { min: 11, max: 20, message: "Difícilmente podrían mantener una conversación sin discutir... 🙊" },
    { min: 21, max: 30, message: "Podrían ser conocidos, pero no esperen mucho más 🤷‍♂️" },
    { min: 31, max: 40, message: "Compañeros de clase o trabajo, tal vez, pero la amistad sería complicada 📚" },
    { min: 41, max: 50, message: "Una amistad casual es posible, pero no serán mejores amigos 🙂" },
    { min: 51, max: 60, message: "Podrían ser buenos amigos si ambos ponen de su parte 👋" },
    { min: 61, max: 70, message: "¡Buena vibra! Tienen potencial para una amistad duradera 🤝" },
    { min: 71, max: 80, message: "¡Grandes amigos en potencia! Disfrutan de la compañía del otro 🎮" },
    { min: 81, max: 90, message: "¡Wow! ¡Serían excelentes mejores amigos! ¡Como hermanos de otra madre! 🤩" },
    { min: 91, max: 100, message: "¡INCREÍBLE! ¡Amigos inseparables! ¡Amistad legendaria! 🏆👯‍♂️" },
  ]

  // Añadir esta propiedad al componente para hacer Math accesible en la plantilla
  math = Math

  ngOnInit(): void {
    // Cargar historial del localStorage
    this.loadHistory()
  }

  loadHistory(): void {
    const savedHistory = localStorage.getItem("compatibilityHistory")
    if (savedHistory) {
      this.compatibilityHistory = JSON.parse(savedHistory)
    }
  }

  saveHistory(): void {
    localStorage.setItem("compatibilityHistory", JSON.stringify(this.compatibilityHistory))
  }

  addToHistory(percentage: number, message: string): void {
    const record: CompatibilityRecord = {
      id: this.generateId(),
      date: new Date().toISOString(),
      mode: this.gameMode,
      person1: { ...this.person1 },
      person2: { ...this.person2 },
      percentage,
      message,
    }

    this.compatibilityHistory.unshift(record) // Añadir al principio

    // Limitar a 20 registros para no sobrecargar el localStorage
    if (this.compatibilityHistory.length > 20) {
      this.compatibilityHistory = this.compatibilityHistory.slice(0, 20)
    }

    this.saveHistory()
  }

  generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
  }

  startGame(): void {
    this.gameState = "mode-select"
  }

  selectMode(mode: GameMode): void {
    this.gameMode = mode
    this.gameState = "input-names"
  }

  proceedToDetails(): void {
    if (this.person1.name.trim() && this.person2.name.trim()) {
      this.gameState = "input-details"
    }
  }

  calculateCompatibility(): void {
    this.gameState = "loading"
    this.loadingProgress = 0

    // Simulación de carga
    this.loadingInterval = setInterval(() => {
      this.loadingProgress += 1

      if (this.loadingProgress >= 100) {
        clearInterval(this.loadingInterval)

        // Calculamos el porcentaje basado en los perfiles
        this.calculateActualCompatibility()
        this.gameState = "result"

        // Guardar en el historial
        const message = this.getCompatibilityMessage()
        this.addToHistory(this.compatibilityPercentage!, message)
      }
    }, 50)
  }

  calculateActualCompatibility(): void {
    // Usamos un hash basado en los nombres para que siempre dé el mismo resultado para las mismas personas
    const nameHash = this.hashNames(this.person1.name, this.person2.name)

    // Base determinista para que siempre dé el mismo resultado para las mismas personas
    const basePercentage = this.getBasePercentage(nameHash)

    // Puntos totales posibles
    const totalPossiblePoints = 100
    let earnedPoints = 0

    // Puntos por cada categoría
    const pointsDistribution = {
      zodiacSign: 15,
      personality: 15,
      musicGenre: 10,
      movieGenre: 10,
      favoriteFood: 10,
      hobby: 10,
      favoriteColor: 5,
      age: 10,
    }

    // Compatibilidad de signos zodiacales (hasta 15 puntos)
    if (this.person1.zodiacSign && this.person2.zodiacSign) {
      const zodiacCompat = this.zodiacCompatibility[this.person1.zodiacSign][this.person2.zodiacSign] || 50
      earnedPoints += (zodiacCompat / 100) * pointsDistribution.zodiacSign
    }

    // Personalidades (hasta 15 puntos)
    if (this.person1.personality && this.person2.personality) {
      const complementaryPersonalities = [
        ["Introvertido/a", "Extrovertido/a"],
        ["Creativo/a", "Analítico/a"],
        ["Aventurero/a", "Tranquilo/a"],
        ["Soñador/a", "Práctico/a"],
        ["Empático/a", "Racional"],
        ["Optimista", "Pesimista"],
        ["Perfeccionista", "Relajado/a"],
        ["Competitivo/a", "Cooperativo/a"],
      ]

      if (this.gameMode === "couple") {
        // Para parejas, personalidades complementarias son mejores
        for (const pair of complementaryPersonalities) {
          if (
            (this.person1.personality === pair[0] && this.person2.personality === pair[1]) ||
            (this.person1.personality === pair[1] && this.person2.personality === pair[0])
          ) {
            earnedPoints += pointsDistribution.personality
            break
          }
        }
      } else {
        // Para amigos, personalidades similares son mejores
        if (this.person1.personality === this.person2.personality) {
          earnedPoints += pointsDistribution.personality
        }
      }
    }

    // Géneros musicales (hasta 10 puntos)
    if (this.person1.musicGenre === this.person2.musicGenre && this.person1.musicGenre) {
      earnedPoints += pointsDistribution.musicGenre
    }

    // Géneros de películas (hasta 10 puntos)
    if (this.person1.movieGenre === this.person2.movieGenre && this.person1.movieGenre) {
      earnedPoints += pointsDistribution.movieGenre
    }

    // Comida favorita (hasta 10 puntos)
    if (this.person1.favoriteFood === this.person2.favoriteFood && this.person1.favoriteFood) {
      earnedPoints += pointsDistribution.favoriteFood
    }

    // Hobby (hasta 10 puntos)
    if (this.person1.hobby.toLowerCase() === this.person2.hobby.toLowerCase() && this.person1.hobby) {
      earnedPoints += pointsDistribution.hobby
    }

    // Color favorito (hasta 5 puntos)
    if (
      this.person1.favoriteColor.toLowerCase() === this.person2.favoriteColor.toLowerCase() &&
      this.person1.favoriteColor
    ) {
      earnedPoints += pointsDistribution.favoriteColor
    }

    // Diferencia de edad (hasta 10 puntos)
    const ageDiff = Math.abs(this.person1.age - this.person2.age)

    if (this.gameMode === "couple") {
      // Para parejas, una diferencia grande de edad puede ser un problema
      if (ageDiff <= 2) {
        earnedPoints += pointsDistribution.age
      } else if (ageDiff <= 5) {
        earnedPoints += pointsDistribution.age * 0.7
      } else if (ageDiff <= 10) {
        earnedPoints += pointsDistribution.age * 0.4
      } else {
        earnedPoints += pointsDistribution.age * 0.2
      }
    } else {
      // Para amigos, una diferencia pequeña de edad es mejor
      if (ageDiff <= 2) {
        earnedPoints += pointsDistribution.age
      } else if (ageDiff <= 5) {
        earnedPoints += pointsDistribution.age * 0.8
      } else if (ageDiff <= 10) {
        earnedPoints += pointsDistribution.age * 0.6
      } else {
        earnedPoints += pointsDistribution.age * 0.3
      }
    }

    // Calculamos el porcentaje final
    // 70% basado en los puntos ganados + 30% basado en el hash de los nombres
    const calculatedPercentage = Math.round((earnedPoints / totalPossiblePoints) * 70 + basePercentage * 0.3)

    // Aseguramos que esté entre 0 y 100
    this.compatibilityPercentage = Math.max(0, Math.min(100, calculatedPercentage))
  }

  // Función para generar un hash basado en los nombres
  hashNames(name1: string, name2: string): number {
    // Ordenamos los nombres alfabéticamente para que el resultado sea el mismo sin importar el orden
    const names = [name1.toLowerCase(), name2.toLowerCase()].sort().join("")

    let hash = 0
    for (let i = 0; i < names.length; i++) {
      const char = names.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convertir a entero de 32 bits
    }

    // Convertir a un número entre 0 y 100
    return Math.abs(hash % 101)
  }

  // Función para obtener un porcentaje base determinista
  getBasePercentage(hash: number): number {
    return hash
  }

  getCompatibilityMessage(): string {
    if (this.compatibilityPercentage === null) return ""

    const messages = this.gameMode === "couple" ? this.coupleCompatibilityMessages : this.friendCompatibilityMessages

    const message = messages.find(
      (m) => this.compatibilityPercentage! >= m.min && this.compatibilityPercentage! <= m.max,
    )

    return message ? message.message : ""
  }

  getGameTitle(): string {
    return this.gameMode === "couple" ? "💖 Medidor de Amor 💖" : "🤝 Medidor de Amistad 🤝"
  }

  getRelationshipType(): string {
    return this.gameMode === "couple" ? "pareja" : "amigos"
  }

  resetGame(): void {
    this.gameState = "start"
    this.person1 = this.getEmptyProfile()
    this.person2 = this.getEmptyProfile()
    this.compatibilityPercentage = null
    this.loadingProgress = 0
    if (this.loadingInterval) {
      clearInterval(this.loadingInterval)
    }
  }

  showHistory(): void {
    this.gameState = "history"
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  private getEmptyProfile(): PersonProfile {
    return {
      name: "",
      age: 15,
      favoriteColor: "",
      hobby: "",
      musicGenre: "",
      movieGenre: "",
      personality: "",
      favoriteFood: "",
      zodiacSign: "",
    }
  }
}


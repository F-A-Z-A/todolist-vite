export const TestGenericFunction = () => {
  // const updateArray = <T>(arr: T[], key: T): T[] => {
  //   return arr.includes(key) ? arr : [...arr, key]
  // }
  //
  // // Строки
  // const stringArray = ["apple", "banana", "cherry"]
  // console.log(updateArray(stringArray, "banana")) // ['apple', 'banana', 'cherry']
  // console.log(updateArray(stringArray, "strawberry")) // ['apple', 'banana', 'cherry', 'strawberry']
  //
  // // Числа
  // const numberArray = [1, 2, 3]
  // console.log(updateArray(numberArray, 2)) // [1, 2, 3]
  // console.log(updateArray(numberArray, 4)) // [1, 2, 3, 4]
  //
  // -------------------------------------------------------------------------------------------
  //
  // const mapArray = <T, K>(arr: T[], foo: (el: T) => K): K[] => {
  //   return arr.map((el) => foo(el))
  // }
  //
  // // Пример 1: Преобразование чисел в строки
  // const numbers = [1, 2, 3, 4]
  // const transformNumberToString = (num: number) => `Number: ${num}`
  //
  // console.log(mapArray(numbers, transformNumberToString)) // ["Number: 1", "Number: 2", "Number: 3", "Number: 4"]
  //
  // // Пример 2: Преобразование строк в их длины
  // const words = ["hello", "world", "typescript"]
  // const getLength = (word: string) => word.length
  //
  // console.log(mapArray(words, getLength)) // [5, 5, 10]
  //
  // // Пример 3: Преобразование объектов в строки
  // type Person = { name: string; age: number }
  // const people: Person[] = [
  //   { name: "Agnes", age: 25 },
  //   { name: "Robert", age: 30 },
  // ]
  // const toDescription = (person: Person) => `${person.name} is ${person.age} years old`
  //
  // console.log(mapArray(people, toDescription)) // ["Agnes is 25 years old", "Robert is 30 years old"]
  //
  // -------------------------------------------------------------------------------------------
  //
  //   const filterArray = <T>(arr: T[], foo: (el: T) => boolean) => {
  //     return arr.filter((el) => foo(el))
  //   }
  //
  //   // Пример 1: Фильтрация чисел
  //   const numbers = [1, 2, 3, 4, 5]
  //   const isEven = (num: number) => num % 2 === 0
  //
  //   console.log(filterArray(numbers, isEven)) // [2, 4]
  //
  //   // Пример 2: Фильтрация строк
  //   const words = ["hello", "world", "typescript"]
  //   const startsWithT = (word: string) => word.startsWith("t")
  //
  //   console.log(filterArray(words, startsWithT)) // ["typescript"]
}

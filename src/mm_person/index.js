import Person from './mm_person.vue'

Person.install = (Vue) => {
	Vue.component(Person.name, Person)
}

export default Person
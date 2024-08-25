const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><strong>Number of exercises {sum}</strong></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
		{parts.map((part) => <Part key={part.id} part={part} />)}
  </>

const Course = ({course}) => 
	<>
		<Header course={course.name} />
		<Content parts={course.parts} />
		<Total sum={course.parts.reduce((a, part) => a + part.exercises, 0)} />
	</>

export default Course
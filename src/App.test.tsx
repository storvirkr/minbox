import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'

describe('Todo App', () => {
  test('should add a task to the list', () => {
    render(<App />)

    // Find the input field and button
    const input = screen.getByPlaceholderText('What needs to be done?')
    const addButton = screen.getByText('Add task')

    // Simulate user typing in the input field
    fireEvent.change(input, { target: { value: 'Test Task 1' } })

    // Simulate clicking the "Add task" button
    fireEvent.click(addButton)

    // Expect the task to be added to the list
    expect(screen.getByText('Test Task 1')).toBeInTheDocument()
  })

  test('should delete done tasks from the list', () => {
    render(<App />)

    // Add a task
    const input = screen.getByPlaceholderText('What needs to be done?')
    const addButton = screen.getByText('Add task')
    fireEvent.change(input, { target: { value: 'Test Task 1' } })
    fireEvent.click(addButton)

    // Mark the task as done
    const doneButton = screen.getByText('done')
    fireEvent.click(doneButton)

    // Click "Delete done tasks" button
    const deleteButton = screen.getByText('Delete done tasks')
    fireEvent.click(deleteButton)

    // Expect the done task to be removed from the list
    expect(screen.queryByText('Test Task 1')).not.toBeInTheDocument()
  })
})


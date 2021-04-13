<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Validator;

class EmployeeController extends Controller
{
    public function getEmployees()
    {
        $employees = Employee::all();

        return response()->json([
            'message' => 'Employees successfully returned',
            'employees' => $employees
        ], 201);
    }
    public function getEmployee(Request $request)
    {
        $employee = Employee::findOrFail($request->id);

        return response()->json([
            'message' => 'Employee successfully returned',
            'employee' => $employee
        ], 201);
    }
    public function createEmployee(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|min:2',
            'lastName' => 'required|string|min:2',
            'profession' => 'required|string|min:2',
            'cabinet_id' => 'required|exists:cabinets,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $employee = Employee::create($validator->validated());

        return response()->json([
            'message' => 'Employee successfully created',
            'employee' => $employee
        ], 201);
    }
    public function updateEmployee(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|min:2',
            'lastName' => 'required|string|min:2',
            'profession' => 'required|string|min:2',
            'cabinet_id' => 'required|exists:cabinets,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $employee = Employee::findOrFail($request->id);

        $employee->update($validator->validated());

        return response()->json([
            'message' => 'Employee successfully updated',
            'employee' => $employee
        ], 201);
    }
}

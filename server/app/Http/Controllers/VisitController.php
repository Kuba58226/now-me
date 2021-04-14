<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Visit as VisitResource;
use App\Models\Visit;
use Validator;

class VisitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function createVisit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'employee_id' => 'required|exists:employees,id',
            'user_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:services,id',
            'start' => 'required|date',
            'end' => 'required|date|after:start'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $visit = new Visit;

        $visit->employee_id = $request->employee_id;
        $visit->user_id = $request->user_id;
        $visit->service_id = $request->service_id;
        $visit->is_paid = false;
        $visit->start = $request->start ;
        $visit->end = $request->end;

        if($visit->save()){
            return response()->json([
                'message' => 'Visit successfully created',
                'visit' => new VisitResource($visit)
            ], 201);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSingleVisit($id)
    {
        $visit = Visit::findOrFail($id);

        return response()->json([
            'message' => 'Visits succesfully returned',
            'visit' => new VisitResource($visit)
        ], 201);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVisits()
    {
        $visits = Visit::all();

        return response()->json([
            'message' => 'Visits succesfully returned',
            'visits' => VisitResource::collection($visits)
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateIsPaid(Request $request)
    {
        $visit = Visit::findOrFail($request->id);

        $visit->is_paid = true;

        return response()->json([
            'message' => "Visit's is_paid succesfully updated",
            'visit' => new VisitResource($visit)
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return VisitResource
     */
    public function destroyVisit($id)
    {
        $visit = Visit::findOrFail($id);

        if($visit->delete()){
            return new VisitResource($visit);
        }
    }
}

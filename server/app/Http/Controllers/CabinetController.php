<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use function GuzzleHttp\Promise\all;
use App\Http\Resources\Cabinet as CabinetResource;
use App\Models\Cabinet;
use Validator;

class CabinetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCabinets()
    {
        // Get all Cabinets
        $cabinets = Cabinet::all();

        // Return collection of Cabinets as a resource
//        return CabinetResource::collection($cabinets);
        return response()->json([
            'message' => 'Success',
            'cabinets' => CabinetResource::collection($cabinets)
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createCabinet(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:cabinets|string|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $cabinet = new Cabinet;

        $cabinet->name = $request->input('name');
        if($cabinet->save()){
            return response()->json([
                'message' => 'Cabinet successfully created',
                'cabinet' => new CabinetResource($cabinet)
            ], 201);
        }
    }

    public function updateCabinet(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:cabinets|string|min:3',
            'id' => 'required|int'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $cabinet = Cabinet::findOrFail($request->id);

        $cabinet->name = $request->input('name');
        if($cabinet->save()){
            return response()->json([
                'message' => 'Cabinet successfully updated',
                'cabinet' => new CabinetResource($cabinet)
            ], 201);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSingleCabinet($id)
    {
        // Get single Cabinet
        $cabinets = Cabinet::FindOrFail($id);

        // Return single Cabinet as a resource
        return response()->json([
            'message' => 'Success',
            'cabinets' => new CabinetResource($cabinets)
        ], 201);
    }
}

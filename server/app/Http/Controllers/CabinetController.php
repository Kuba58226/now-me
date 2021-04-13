<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use function GuzzleHttp\Promise\all;
use App\Http\Resources\Cabinet as CabinetResource;
use App\Models\Cabinet;
use Validator;

class CabinetController extends Controller
{
    public function getCabinets()
    {
        $cabinets = Cabinet::all();

        return response()->json([
            'message' => 'Cabinets successfully returned',
            'cabinets' => CabinetResource::collection($cabinets)
        ], 201);
    }
    public function getSingleCabinet(Request $request)
    {
        $cabinets = Cabinet::FindOrFail($request->id);

        return response()->json([
            'message' => 'Cabinet successfully returned',
            'cabinets' => new CabinetResource($cabinets)
        ], 201);
    }
    public function createCabinet(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:cabinets|string|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $cabinet = new Cabinet;

        $cabinet->name = $request->name;

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
}

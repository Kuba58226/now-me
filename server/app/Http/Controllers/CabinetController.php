<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cabinet;
use Validator;

class CabinetController extends Controller
{
    public function getCabinets(Request $request){
        $cabinets = Cabinet::all();
        return response()->json([
            'message' => 'Success',
            'cabinets' => $cabinets
        ], 201);
    }

    public function addCabinet(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $cabinet = Cabinet::create(array_merge(
            $validator->validated(),
        ));

        return response()->json([
            'message' => 'Cabinet successfully created',
            'cabinet' => $cabinet
        ], 201);

    }
}

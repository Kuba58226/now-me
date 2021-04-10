<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use function GuzzleHttp\Promise\all;
use App\Http\Resources\Cabinet as CabinetResource;
use App\Models\Cabinet;

class CabinetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCabinets()
    {
        // Get all Cabinets
        $cabinets = Cabinet::paginate(15);

        // Return collection of Cabinets as a resource
        return CabinetResource::collection($cabinets);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $cabinet = $request->isMethod('put') ? Cabinet::findOrFail
        ($request->cabinet_id) : new Cabinet;

        $cabinet->id = $request->input('cabinet_id');
        $cabinet->name = $request->input('name');
        if($cabinet->save()){
            return new CabinetResource($cabinet);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getSingleCabinet($id)
    {
        // Get all Cabinets
        $cabinets = Cabinet::FindOrFail($id);

        // Return collection of Cabinets as a resource
        return new CabinetResource($cabinets);
    }
}

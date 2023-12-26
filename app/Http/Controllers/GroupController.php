<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index(): JsonResponse
    {
        $groups = Group::where([
            ['shop_id', auth()->user()->id]
        ])->get();
        return response()->json($groups);
    }

    public function store(Request $request): JsonResponse
    {
        $groupid = $request->groupId;

        // Store Edit from one place
        if ($groupid != 0) {
            $group = Group::find($groupid);
        } else {
            $group = new Group();
        }

        $group->name = $request->name;
        $group->description = $request->description;
        $group->shop_id = auth()->user()->id;
        $group->status = ($request->status === 'active' || $request->status == 1) ? 1 : 0;

        $group->save();

        return response()->json($group, 201);
    }

    public function show(Group $group): JsonResponse
    {
        return response()->json($group);
    }

    public function destroy(Group $group): JsonResponse
    {
        $group->delete();

        return response()->json([
            'message' => 'Group Deleted Successfully',
            'status' => 'Success'
        ]);
    }
}

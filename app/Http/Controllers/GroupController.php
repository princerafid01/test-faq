<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{
    public function index(): JsonResponse
    {
        $groups = Group::where([
            ['shop_id', auth()->user()->id]
        ])->get();

        // $shop = Auth::user();
        // $request = $shop->api()->rest('GET', '/admin/api/tem.json');
        // return response()->json($request);
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

    public function get_available_groups_id(): JsonResponse
    {
        $groups_id = Group::pluck('id');
        return response()->json($groups_id);
    }

    public function groups_with_faq(Group $group): JsonResponse
    {

        return response()->json($group->load('faqs'), 200);
    }
}

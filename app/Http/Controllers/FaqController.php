<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\Group;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function index(Request $request, $groupid): JsonResponse
    {
        //get FAQs for a group
        //check if this group id belongs to shop id
        $group = Group::findOrFail($groupid);

        $faqs = Faq::where('group_id', $group->id)->get();

        return response()->json($faqs, 200);
    }

    public function store(Request $request, $groupid): JsonResponse
    {
        //get FAQs for a group
        //check if this group id belongs to shop id
        $group = Group::findOrFail($groupid);
        $shop = $request->user();

        // Store And Edit happening from one place
        $faqid = $request->faqid;
        if ($faqid != 0) {
            $faq = Faq::find($faqid);
        } else {
            $faq = new Faq();
        }

        $faq->question = $request->question;
        $faq->answer = $request->answer;
        $faq->group_id = $group->id;
        $faq->shop_id = $shop->id;
        $faq->status =  $request->status;

        $faq->save();

        return response()->json($faq, 201);
    }
}

@extends('layouts.app')

@section('content')
    <div id="publish-survey-container" class="row well well-lg"></div>
@endsection

@push('scripts')
    <script src="{{ mix('js/publish-survey-render.js') }}"></script>
@endpush

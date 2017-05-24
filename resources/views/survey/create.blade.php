@extends('layouts.app')

@section('content')
    <div id="survey-creation" class="row well well-lg"></div>
@endsection

@push('scripts')
    <script src="{{ mix('js/build-survey-render.js') }}"></script>
@endpush
